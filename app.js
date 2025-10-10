let SUPABASE_URL = "";
let SUPABASE_ANON_KEY = "";
let supabase;

async function loadConfig() {
  if (window.__bringJoyConfig) {
    return window.__bringJoyConfig;
  }

  const response = await fetch("config.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Nu s-a putut încărca fișierul config.json");
  }

  const data = await response.json();
  window.__bringJoyConfig = data;
  return data;
}

// State
let allChildren = [];
let childrenByStatus = {};

// DOM Elements
const searchInput = document.getElementById("searchInput");
const childrenContainer = document.getElementById("childrenContainer");
const letterModal = document.getElementById("letterModal");
const modalChildName = document.getElementById("modalChildName");
const modalLetterContent = document.getElementById("modalLetterContent");
const closeModal = document.querySelector(".close");

// Initialize app
async function init() {
  try {
    const config = await loadConfig();
    SUPABASE_URL = config.supabase?.url || "";
    SUPABASE_ANON_KEY = config.supabase?.anonKey || "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Configurația Supabase lipsește din config.json");
    }

    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (error) {
    console.error("Error loading config:", error);
    childrenContainer.innerHTML = `
            <div class="loading">
                ❌ Configurația aplicației nu a putut fi încărcată. Verifică fișierul config.json.
            </div>
        `;
    return;
  }

  await loadChildren();
  setupRealtimeSubscription();
  setupEventListeners();
}

// Load children from Supabase
async function loadChildren() {
  try {
    if (!supabase) {
      throw new Error("Clientul Supabase nu este inițializat");
    }

    const { data, error } = await supabase
      .from("children")
      .select("*")
      .order("comunitate", { ascending: true })
      .order("nume", { ascending: true });

    if (error) throw error;

    allChildren = data;
    renderChildren(allChildren);
  } catch (error) {
    console.error("Error loading children:", error);
    childrenContainer.innerHTML = `
            <div class="loading">
                ❌ Eroare la încărcarea datelor. Te rugăm să verifici configurația Supabase.
            </div>
        `;
  }
}

// Render children grouped by community
function renderChildren(children) {
  if (children.length === 0) {
    childrenContainer.innerHTML = `
            <div class="loading">
                Nu au fost găsiți copii. Încearcă o altă căutare.
            </div>
        `;
    return;
  }

  // Group children by community
  const grouped = children.reduce((acc, child) => {
    if (!acc[child.comunitate]) {
      acc[child.comunitate] = [];
    }
    acc[child.comunitate].push(child);
    return acc;
  }, {});

  // Render grouped children
  let html = "";
  for (const [community, communityChildren] of Object.entries(grouped)) {
    html += `
            <div class="community-group">
                <h2 class="community-title">${community}</h2>
                <div class="children-grid">
                    ${communityChildren
                      .map((child) => renderChildCard(child))
                      .join("")}
                </div>
            </div>
        `;
  }

  childrenContainer.innerHTML = html;
}

// Render individual child card
function renderChildCard(child) {
  const isFinished = child.status === "finished";
  const isReserved = child.status === "reserved";

  let statusBadge = "";
  if (isFinished) {
    statusBadge = '<span class="status-badge finished">✅ Finanțat</span>';
  } else if (isReserved) {
    statusBadge = '<span class="status-badge">⏳ Rezervat</span>';
  }

  const donateButton =
    isFinished || isReserved
      ? `<button class="btn btn-primary" disabled>Donează ${child.suma} RON</button>`
      : `<button class="btn btn-primary" onclick="donate('${child.id}')">Donează ${child.suma} RON</button>`;

  return `
        <div class="child-card ${
          isFinished ? "finished" : ""
        }" data-child-id="${child.id}">
            ${statusBadge}
            <img src="${child.poza_url}" alt="${
    child.nume
  }" class="child-image" />
            <div class="child-info">
                <h3 class="child-name">${child.nume}</h3>
                <p class="child-description">${child.text_scurt}</p>
                <div class="child-amount">${child.suma} RON</div>
                <div class="child-actions">
                    <button class="btn btn-secondary" onclick="openLetter('${
                      child.id
                    }')">
                        Scrisoare
                    </button>
                    ${donateButton}
                </div>
            </div>
        </div>
    `;
}

// Open letter modal
function openLetter(childId) {
  const child = allChildren.find((c) => c.id === childId);
  if (!child) return;

  modalChildName.textContent = `Scrisoarea lui ${child.nume}`;
  modalLetterContent.innerHTML = child.text_scrisoare;
  letterModal.classList.add("active");
}

// Close letter modal
function closeLetter() {
  letterModal.classList.remove("active");
}

// Donate to a child
async function donate(childId) {
  const child = allChildren.find((c) => c.id === childId);
  if (!child) return;

  if (child.status !== "raising") {
    alert("Acest copil nu mai este disponibil pentru donație.");
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    alert("Configurația Supabase nu este disponibilă.");
    return;
  }

  try {
    // Call create-payment edge function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/create-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          child_id: childId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Eroare la procesarea donației");
    }

    // Redirect to payment page
    window.location.href = data.redirect;
  } catch (error) {
    console.error("Error creating payment:", error);
    alert(
      `Eroare: ${error.message}. Verifică că funcțiile Edge sunt configurate corect.`
    );
  }
}

// Search functionality
function searchChildren(query) {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    renderChildren(allChildren);
    return;
  }

  const filtered = allChildren.filter((child) => {
    return (
      child.nume.toLowerCase().includes(lowerQuery) ||
      child.text_scurt.toLowerCase().includes(lowerQuery) ||
      child.comunitate.toLowerCase().includes(lowerQuery)
    );
  });

  renderChildren(filtered);
}

// Setup Realtime subscription
function setupRealtimeSubscription() {
  if (!supabase) {
    return;
  }

  const channel = supabase
    .channel("children-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "children",
      },
      (payload) => {
        console.log("Realtime update:", payload);
        handleRealtimeUpdate(payload);
      }
    )
    .subscribe();
}

// Handle realtime updates
function handleRealtimeUpdate(payload) {
  if (payload.eventType === "UPDATE") {
    // Update the child in our local state
    const index = allChildren.findIndex((c) => c.id === payload.new.id);
    if (index !== -1) {
      allChildren[index] = payload.new;

      // Update the card in the DOM without full re-render
      updateChildCard(payload.new);
    }
  } else if (payload.eventType === "INSERT") {
    // Add new child
    allChildren.push(payload.new);
    renderChildren(allChildren);
  } else if (payload.eventType === "DELETE") {
    // Remove child
    allChildren = allChildren.filter((c) => c.id !== payload.old.id);
    renderChildren(allChildren);
  }
}

// Update a single child card in the DOM
function updateChildCard(child) {
  const cardElement = document.querySelector(`[data-child-id="${child.id}"]`);
  if (!cardElement) return;

  const parentGrid = cardElement.parentElement;
  const newCardHtml = renderChildCard(child);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = newCardHtml;
  const newCard = tempDiv.firstElementChild;

  cardElement.replaceWith(newCard);
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchChildren(e.target.value);
    });
  }

  // Modal close button
  if (closeModal) {
    closeModal.addEventListener("click", closeLetter);
  }

  // Close modal when clicking outside
  if (letterModal) {
    letterModal.addEventListener("click", (e) => {
      if (e.target === letterModal) {
        closeLetter();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && letterModal.classList.contains("active")) {
      closeLetter();
    }
  });
}

// Make functions globally available
window.openLetter = openLetter;
window.closeLetter = closeLetter;
window.donate = donate;

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
