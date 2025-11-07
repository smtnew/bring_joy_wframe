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
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchClose = document.getElementById("searchClose");
const childrenContainer = document.getElementById("childrenContainer");
const letterModal = document.getElementById("letterModal");
const modalChildName = document.getElementById("modalChildName");
const modalLetterContent = document.getElementById("modalLetterContent");
const closeModal = document.querySelector(".close");

// Navigation dropdown elements
const communitiesDropdown = document.getElementById("communitiesDropdown");
const communitiesDropdownMenu = document.getElementById(
  "communitiesDropdownMenu"
);
const communitiesList = document.getElementById("communitiesList");

// Donation modal elements
let currentDonationChildId = null;

function openSearchPanel() {
  if (!searchPanel) return;
  searchPanel.dataset.open = "true";
  searchPanel.classList.add("open");
  searchPanel.removeAttribute("hidden");
  if (searchToggle) {
    searchToggle.setAttribute("aria-expanded", "true");
  }
  if (searchInput) {
    searchInput.focus({ preventScroll: true });
    searchInput.select();
  }
}

function closeSearchPanel() {
  if (!searchPanel) return;
  searchPanel.dataset.open = "false";
  searchPanel.classList.remove("open");
  searchPanel.setAttribute("hidden", "");
  if (searchToggle) {
    searchToggle.setAttribute("aria-expanded", "false");
  }
}

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
      .select("*, suma_stransa")
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
    const communityId = `community-${encodeURIComponent(community)}`;
    const childrenCount = communityChildren.length;
    html += `
            <div class="community-group" id="${communityId}">
                <h2 class="community-title">${community} (${childrenCount} ${
      childrenCount === 1 ? "copil" : "copii"
    })</h2>
                <div class="children-grid">
                    ${communityChildren
                      .map((child) => renderChildCard(child))
                      .join("")}
                </div>
            </div>
        `;
  }

  childrenContainer.innerHTML = html;

  // Populate communities dropdown after rendering with current children
  populateCommunitiesDropdown(children);
}

// Populate communities dropdown
function populateCommunitiesDropdown(children = allChildren) {
  if (!communitiesList || !children.length) return;

  // Group children by community to get counts
  const communityCounts = children.reduce((acc, child) => {
    acc[child.comunitate] = (acc[child.comunitate] || 0) + 1;
    return acc;
  }, {});

  // Get unique communities from children data
  const communities = [
    ...new Set(children.map((child) => child.comunitate)),
  ].sort();

  // Clear existing communities
  communitiesList.innerHTML = "";

  // Add each community as a dropdown item
  communities.forEach((community) => {
    const communityItem = document.createElement("a");
    communityItem.href = `#community-${encodeURIComponent(community)}`;
    communityItem.className = "nav-dropdown-item";
    communityItem.role = "menuitem";

    const childrenCount = communityCounts[community];
    communityItem.textContent = `${community} (${childrenCount} ${
      childrenCount === 1 ? "copil" : "copii"
    })`;

    communityItem.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToCommunity(community);
      closeCommunitiesDropdown();
    });

    communitiesList.appendChild(communityItem);
  });
}

// Scroll to specific community
function scrollToCommunity(communityName) {
  // First scroll to communities section
  const communitiesSection = document.getElementById("communities");
  if (communitiesSection) {
    communitiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Then find and scroll to the specific community
  setTimeout(() => {
    const communityGroups = document.querySelectorAll(".community-group");
    for (const group of communityGroups) {
      const titleElement = group.querySelector(".community-title");
      if (titleElement && titleElement.textContent.trim() === communityName) {
        group.scrollIntoView({ behavior: "smooth", block: "start" });
        // Add a temporary highlight effect
        group.style.transition = "all 0.3s ease";
        group.style.backgroundColor = "rgba(255, 49, 49, 0.05)";
        group.style.borderRadius = "8px";
        group.style.padding = "1rem";
        setTimeout(() => {
          group.style.backgroundColor = "";
          group.style.padding = "";
        }, 2000);
        break;
      }
    }
  }, 500);
}

// Open communities dropdown
function openCommunitiesDropdown() {
  if (!communitiesDropdown || !communitiesDropdownMenu) return;

  communitiesDropdown.setAttribute("aria-expanded", "true");
  communitiesDropdownMenu.classList.add("show");
}

// Close communities dropdown
function closeCommunitiesDropdown() {
  if (!communitiesDropdown || !communitiesDropdownMenu) return;

  communitiesDropdown.setAttribute("aria-expanded", "false");
  communitiesDropdownMenu.classList.remove("show");
}

// Render individual child card
function renderChildCard(child) {
  const isFinished = child.status === "finished";
  const sumaStransa = child.suma_stransa || 0;
  const sumaTarget = child.suma;
  const percentage = Math.min(
    100,
    Math.round((sumaStransa / sumaTarget) * 100)
  );
  const remainingAmount = Math.max(0, sumaTarget - sumaStransa);

  let statusBadge = "";
  if (isFinished) {
    statusBadge = '<span class="status-badge finished">✅ Finanțat</span>';
  }

  // Show progress bar even at 0% so donors see the fundraising target
  let progressBar = "";
  if (!isFinished) {
    const progressWidth = percentage > 0 ? `${percentage}%` : "4px";
    progressBar = `
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressWidth}"></div>
        </div>
        <div class="progress-text">${sumaStransa} / ${sumaTarget} RON (${percentage}%)</div>
      </div>
    `;
  }

  const donateButton = isFinished
    ? `<button class="btn btn-primary" disabled>Finanțat complet</button>`
    : `<button class="btn btn-primary" onclick="openDonationModal('${
        child.id
      }')">Donează${
        remainingAmount > 0 ? ` (${remainingAmount} RON rămași)` : ""
      }</button>`;

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
                <div class="child-amount">Necesar: ${child.suma} RON</div>
                ${progressBar}
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

// Open donation modal
function openDonationModal(childId) {
  const child = allChildren.find((c) => c.id === childId);
  if (!child) return;

  if (child.status === "finished") {
    alert("Acest copil a primit deja finanțarea completă.");
    return;
  }

  currentDonationChildId = childId;
  const sumaStransa = child.suma_stransa || 0;
  const remainingAmount = Math.max(0, child.suma - sumaStransa);

  const donationModal = document.getElementById("donationModal");
  const donationModalTitle = document.getElementById("donationModalTitle");
  const donationModalDescription = document.getElementById(
    "donationModalDescription"
  );
  const donationAmountInput = document.getElementById("donationAmount");

  donationModalTitle.textContent = `Donează pentru ${child.nume}`;

  if (remainingAmount > 0) {
    donationModalDescription.innerHTML = `
      <p>Suma necesară: <strong>${child.suma} RON</strong></p>
      <p>Suma strânsă: <strong>${sumaStransa} RON</strong></p>
      <p>Suma rămasă: <strong>${remainingAmount} RON</strong></p>
      <p class="donation-info">Poți dona orice sumă între 1 RON și ${remainingAmount} RON.</p>
    `;
    donationAmountInput.value = remainingAmount;
    donationAmountInput.max = remainingAmount;
  } else {
    donationModalDescription.innerHTML = `
      <p>Suma necesară: <strong>${child.suma} RON</strong></p>
      <p>Suma strânsă: <strong>${sumaStransa} RON</strong></p>
      <p class="donation-info">Poți dona orice sumă începând de la 1 RON.</p>
    `;
    donationAmountInput.value = child.suma;
    donationAmountInput.removeAttribute("max");
  }

  donationModal.classList.add("active");
}

// Close donation modal
function closeDonationModal() {
  const donationModal = document.getElementById("donationModal");
  donationModal.classList.remove("active");
  currentDonationChildId = null;
}

// Confirm donation
async function confirmDonation() {
  if (!currentDonationChildId) return;

  const donationAmountInput = document.getElementById("donationAmount");
  const amount = parseInt(donationAmountInput.value, 10);

  const childId = currentDonationChildId;

  if (!amount || amount <= 0) {
    alert("Te rugăm să introduci o sumă validă.");
    return;
  }

  const child = allChildren.find((c) => c.id === childId);
  if (!child) return;

  const sumaStransa = child.suma_stransa || 0;
  const remainingAmount = Math.max(0, child.suma - sumaStransa);

  // Validate amount doesn't exceed remaining if there's a target
  if (remainingAmount > 0 && amount > remainingAmount) {
    alert(
      `Suma maximă disponibilă pentru donație este ${remainingAmount} RON.`
    );
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    alert("Configurația Supabase nu este disponibilă.");
    return;
  }

  try {
    closeDonationModal();

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
          amount: amount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Eroare la procesarea donației");
    }

    // Redirect to payment page in a new tab to keep the campaign open
    window.open(data.redirect, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Error creating payment:", error);
    alert(
      `Eroare: ${error.message}. Verifică că funcțiile Edge sunt configurate corect.`
    );
  }
}

// Legacy donate function - keeping for backwards compatibility
async function donate(childId) {
  openDonationModal(childId);
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
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener("click", () => {
      const isOpen = searchPanel.dataset.open === "true";
      if (isOpen) {
        closeSearchPanel();
      } else {
        openSearchPanel();
      }
    });

    if (searchClose) {
      searchClose.addEventListener("click", () => {
        closeSearchPanel();
        if (searchToggle) {
          searchToggle.focus();
        }
      });
    }

    document.addEventListener("click", (event) => {
      if (
        searchPanel.dataset.open === "true" &&
        !searchPanel.contains(event.target) &&
        !searchToggle.contains(event.target)
      ) {
        closeSearchPanel();
      }
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchChildren(e.target.value);
    });
  }

  // Communities dropdown
  if (communitiesDropdown && communitiesDropdownMenu) {
    communitiesDropdown.addEventListener("click", () => {
      const isOpen =
        communitiesDropdown.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeCommunitiesDropdown();
      } else {
        openCommunitiesDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !communitiesDropdown.contains(event.target) &&
        !communitiesDropdownMenu.contains(event.target)
      ) {
        closeCommunitiesDropdown();
      }
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
    if (e.key === "Escape") {
      let handled = false;

      if (letterModal && letterModal.classList.contains("active")) {
        closeLetter();
        handled = true;
      }

      if (searchPanel && searchPanel.dataset.open === "true") {
        closeSearchPanel();
        handled = true;
      }

      if (
        communitiesDropdown &&
        communitiesDropdown.getAttribute("aria-expanded") === "true"
      ) {
        closeCommunitiesDropdown();
        handled = true;
      }

      if (handled) {
        e.preventDefault();
      }
    }
  });

  // Back to top button functionality
  setupBackToTop();
}

// Back to top functionality
function setupBackToTop() {
  const backToTopButton = document.getElementById("backToTop");
  if (!backToTopButton) return;

  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleBackToTopButton);
  backToTopButton.addEventListener("click", scrollToTop);

  // Initial check
  toggleBackToTopButton();
}

// Make functions globally available
window.openLetter = openLetter;
window.closeLetter = closeLetter;
window.donate = donate;
window.openDonationModal = openDonationModal;
window.closeDonationModal = closeDonationModal;
window.confirmDonation = confirmDonation;

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
