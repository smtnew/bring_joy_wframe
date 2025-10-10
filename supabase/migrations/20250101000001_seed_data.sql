-- Insert sample children data
insert into children (nume, text_scurt, text_scrisoare, poza_url, suma, comunitate, status) values
(
  'Maria Popescu',
  'Maria are 8 ani și iubește să deseneze. Visează să devină artistă.',
  '<p>Dragă prieten,</p><p>Mă numesc Maria și am 8 ani. Îmi place foarte mult să desenez și să pictez. La școală sunt cea mai bună la desen și profesoara mea spune că am talent. Mi-ar plăcea foarte mult să am culori noi și caiete de desen pentru a-mi putea dezvolta pasiunea.</p><p>De Crăciun mi-aș dori niște creioane colorate profesionale și albume de desen. Îți mulțumesc că te gândești la mine!</p><p>Cu drag,<br>Maria</p>',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
  150,
  'Comunitatea Speranța',
  'raising'
),
(
  'Andrei Ionescu',
  'Andrei are 10 ani și adoră matematica și tehnologia.',
  '<p>Bună ziua,</p><p>Sunt Andrei și am 10 ani. Îmi place foarte mult matematica și vreau să învăț despre calculatoare. La școală particip la olimpiade de matematică și mi-ar plăcea să am o carte despre programare pentru copii.</p><p>Mi-ar face o mare bucurie să primesc o carte de programare și un set de instrumente pentru proiecte STEM. Vreau să devin programator când voi fi mare!</p><p>Mulțumesc din inimă,<br>Andrei</p>',
  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400',
  200,
  'Comunitatea Lumina',
  'raising'
),
(
  'Elena Dumitrescu',
  'Elena are 7 ani și îi place să citească povești.',
  '<p>Salut,</p><p>Sunt Elena și am 7 ani. Îmi place să citesc povești și să mă joc cu păpușile. Mama spune că sunt foarte isteață și că citesc foarte bine pentru vârsta mea.</p><p>De Crăciun mi-aș dori câteva cărți cu povești și o păpușă nouă. Nu am multe jucării și mi-ar face foarte fericită să primesc un cadou.</p><p>Te îmbrățișez,<br>Elena</p>',
  'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=400',
  120,
  'Comunitatea Speranța',
  'raising'
),
(
  'Mihai Popa',
  'Mihai are 9 ani și visează să joace fotbal.',
  '<p>Bună,</p><p>Mă cheamă Mihai și am 9 ani. Îmi place foarte mult fotbalul și mă uit mereu la meciuri la televizor. Joc fotbal cu prietenii mei pe un teren de pământ din sat, dar nu am minge proprie.</p><p>Mi-ar plăcea foarte mult să am o minge de fotbal și un tricou de fotbal. Visez să devin fotbalist profesionist!</p><p>Mulțumesc mult,<br>Mihai</p>',
  'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=400',
  180,
  'Comunitatea Lumina',
  'raising'
),
(
  'Ioana Gheorghe',
  'Ioana are 11 ani și iubește muzica.',
  '<p>Dragă donator,</p><p>Numele meu este Ioana și am 11 ani. Îmi place foarte mult să cânt și să ascult muzică. La școală cânt în cor și toată lumea spune că am o voce frumoasă.</p><p>Mi-ar plăcea să am o chitară mică pe care să învăț să cânt. Profesorul de muzică a spus că mă poate învăța dacă am o chitară. Acesta ar fi cel mai frumos cadou de Crăciun!</p><p>Îți mulțumesc din suflet,<br>Ioana</p>',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
  250,
  'Comunitatea Bucuria',
  'raising'
);

-- Additional children to reach ~60 entries across four communities
insert into children (nume, text_scurt, text_scrisoare, poza_url, suma, comunitate, status) values
(
  'Cristian Matei',
  'Cristian are 9 ani și este fascinat de experimentele științifice.',
  '<p>Dragă donator,</p><p>Mă numesc Cristian și am 9 ani. Îmi place să construiesc experimente simple cu materiale pe care le găsesc acasă. Visul meu este să devin inventator.</p><p>Mi-aș dori un set de chimie pentru copii și o carte cu experimente ușoare, ca să pot învăța mai bine.</p><p>Îți mulțumesc pentru ajutor,<br>Cristian</p>',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
  190,
  'Comunitatea Speranța',
  'raising'
),
(
  'Ana Voicu',
  'Ana are 8 ani și își dorește haine groase pentru iarnă.',
  '<p>Salut!</p><p>Sunt Ana și am 8 ani. Iarna la noi în sat este foarte frig și nu am haine călduroase potrivite.</p><p>Aș vrea să primesc o geacă groasă și o pereche de ghete. Astfel aș putea merge la școală fără să tremur.</p><p>Cu recunoștință,<br>Ana</p>',
  'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400',
  220,
  'Comunitatea Speranța',
  'raising'
),
(
  'Sorina Pavel',
  'Sorina adoră să picteze peisaje din satul ei.',
  '<p>Dragă prieten,</p><p>Mă cheamă Sorina, am 10 ani și mă liniștește să pictez dealurile și râurile din apropiere.</p><p>Mi-aș dori culori acrilice și pensule noi. Astfel pot crea tablouri mai detaliate pentru expoziția școlii.</p><p>Mulțumesc că te gândești la mine,<br>Sorina</p>',
  'https://images.unsplash.com/photo-1473834055321-bb9d5a07023c?w=400',
  180,
  'Comunitatea Speranța',
  'raising'
),
(
  'Gabriel Dima',
  'Gabriel visează la un mic kit de robotică.',
  '<p>Bună ziua,</p><p>Sunt Gabriel, am 11 ani și urmăresc tutoriale despre roboți pe internet.</p><p>Mi-ar plăcea un kit de robotică pentru începători. Aș putea construi roboței pe care să-i programez cu ajutorul profesorului meu de tehnologie.</p><p>Cu mulțumiri,<br>Gabriel</p>',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
  260,
  'Comunitatea Speranța',
  'raising'
),
(
  'Irina Radu',
  'Irina este pasionată de lectură și vrea noi povești.',
  '<p>Salut!</p><p>Mă numesc Irina și am 7 ani. Îmi place să citesc seara lângă sobă povești cu prințese curajoase.</p><p>Mi-aș dori o colecție de cărți ilustrate și un lampadar mic pentru citit.</p><p>Cu drag,<br>Irina</p>',
  'https://images.unsplash.com/photo-1455885666463-7771f17293a5?w=400',
  140,
  'Comunitatea Speranța',
  'raising'
),
(
  'Bianca Stan',
  'Bianca iubește dansul și repetă în fiecare zi.',
  '<p>Dragă susținător,</p><p>Sunt Bianca, am 12 ani și dansez în grupul artistic al școlii.</p><p>Îmi doresc pantofi de dans și o salopetă comodă pentru repetiții.</p><p>Mulțumesc pentru sprijin,<br>Bianca</p>',
  'https://images.unsplash.com/photo-1520975922131-c0d61b586c0c?w=400',
  230,
  'Comunitatea Speranța',
  'raising'
),
(
  'Tudor Enache',
  'Tudor visează să exploreze stelele.',
  '<p>Dragă prieten,</p><p>Sunt Tudor și am 10 ani. Mă uit mereu la cerul nopții cu bunicul.</p><p>Mi-ar plăcea un telescop mic și un ghid de astronomie pentru copii.</p><p>Mulțumesc că mă ajuți să descopăr universul,<br>Tudor</p>',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400',
  280,
  'Comunitatea Speranța',
  'raising'
),
(
  'Adela Munteanu',
  'Adela confecționează bijuterii din mărgele.',
  '<p>Bună!</p><p>Mă numesc Adela, am 9 ani și îmi place să fac brățări colorate pentru prietenele mele.</p><p>Îmi doresc un set mare de mărgele și cutii pentru depozitare.</p><p>Cu recunoștință,<br>Adela</p>',
  'https://images.unsplash.com/photo-1512427691650-1e0c44d7a73a?w=400',
  160,
  'Comunitatea Speranța',
  'raising'
),
(
  'Rares Costache',
  'Rares adoră jocurile de strategie cu familia.',
  '<p>Salut!</p><p>Sunt Rares și am 11 ani. Serile le petrecem jucând board games cu părinții.</p><p>Mi-ar plăcea un joc de strategie nou și un puzzle 3D.</p><p>Mulțumesc mult,<br>Rares</p>',
  'https://images.unsplash.com/photo-1525596203736-502c7c6787f4?w=400',
  175,
  'Comunitatea Speranța',
  'raising'
),
(
  'Daria Olaru',
  'Daria iubește animalele și vrea să devină medic veterinar.',
  '<p>Dragă prieten,</p><p>Mă numesc Daria și am 10 ani. Am grijă de pisoii vecinilor când pleacă de acasă.</p><p>Mi-aș dori enciclopedii despre animale și un set de îngrijire pentru animăluțe de pluș.</p><p>Îți mulțumesc,<br>Daria</p>',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400',
  210,
  'Comunitatea Speranța',
  'raising'
),
(
  'Paula Neagu',
  'Paula compune poezii despre satul ei.',
  '<p>Bună ziua,</p><p>Sunt Paula și am 12 ani. Scriu poezii despre oamenii și locurile dragi mie.</p><p>Îmi doresc un jurnal frumos și un set de stilouri colorate.</p><p>Mulțumesc din suflet,<br>Paula</p>',
  'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400',
  150,
  'Comunitatea Speranța',
  'raising'
),
(
  'Ema Dragan',
  'Ema rezolvă cu drag puzzle-uri dificile.',
  '<p>Salut!</p><p>Mă numesc Ema, am 7 ani și îmi place să construiesc puzzle-uri mari cu mama.</p><p>Mi-ar plăcea puzzle-uri de 500 de piese și o masă pliabilă pe care să le fac.</p><p>Cu drag,<br>Ema</p>',
  'https://images.unsplash.com/photo-1523473827534-86c48f0b8a5f?w=400',
  165,
  'Comunitatea Speranța',
  'raising'
),
(
  'Larisa Petrus',
  'Larisa cântă în corul bisericii din sat.',
  '<p>Dragă susținător,</p><p>Sunt Larisa și am 13 ani. Cânt în cor și visul meu este să devin solistă.</p><p>Îmi doresc un microfon pentru repetiții și un stand pentru partituri.</p><p>Îți mulțumesc,<br>Larisa</p>',
  'https://images.unsplash.com/photo-1485231183945-fffde7cc0516?w=400',
  240,
  'Comunitatea Speranța',
  'raising'
),
(
  'Vlad Marinescu',
  'Vlad este pasionat de programare.',
  '<p>Salut!</p><p>Sunt Vlad și am 11 ani. Învăț Scratch la cercul de informatică.</p><p>Mi-ar plăcea o tastatură mecanică și o carte cu proiecte de programare pentru copii.</p><p>Mulțumesc,<br>Vlad</p>',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400',
  270,
  'Comunitatea Lumina',
  'raising'
),
(
  'Stefan Ilie',
  'Stefan visează să devină portar profesionist.',
  '<p>Dragă prieten,</p><p>Sunt Stefan, am 12 ani și joc fotbal la echipa școlii.</p><p>Mi-aș dori mănuși de portar și jaloane pentru antrenamente.</p><p>Mulțumesc pentru sprijin,<br>Stefan</p>',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400',
  210,
  'Comunitatea Lumina',
  'raising'
),
(
  'Denis Cazan',
  'Denis merge zilnic la antrenamentele de ciclism.',
  '<p>Bună!</p><p>Sunt Denis și am 10 ani. Îmi place să pedalez pe dealurile din sat.</p><p>Mi-ar plăcea o cască de bicicletă și lumini de siguranță.</p><p>Cu recunoștință,<br>Denis</p>',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400',
  195,
  'Comunitatea Lumina',
  'raising'
),
(
  'Nicolae Balan',
  'Nicolae citește cărți de istorie și biografii.',
  '<p>Salut!</p><p>Mă numesc Nicolae și am 13 ani. Sunt fascinat de poveștile despre domnitori.</p><p>Mi-ar plăcea o colecție de cărți istorice și un abonament la revista pentru copii.</p><p>Îți mulțumesc,<br>Nicolae</p>',
  'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400',
  185,
  'Comunitatea Lumina',
  'raising'
),
(
  'Alin Ciobanu',
  'Alin desenează personaje din benzi desenate.',
  '<p>Dragă donator,</p><p>Sunt Alin și am 9 ani. Visez să creez propriile mele benzi desenate.</p><p>Mi-aș dori un set de markere profesionale și un caiet special pentru ilustrații.</p><p>Mulțumesc,<br>Alin</p>',
  'https://images.unsplash.com/photo-1524946829910-48f0d8f06d51?w=400',
  200,
  'Comunitatea Lumina',
  'raising'
),
(
  'Victor Damian',
  'Victor realizează experimente de fizică acasă.',
  '<p>Bună ziua,</p><p>Sunt Victor și am 11 ani. Îmi construiesc singur dispozitive simple din lemn și fire.</p><p>Mi-ar plăcea un set de experimente de fizică și un multimetru pentru copii.</p><p>Cu respect,<br>Victor</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
  260,
  'Comunitatea Lumina',
  'raising'
),
(
  'Ciprian Lupu',
  'Ciprian aleargă zilnic pe terenul școlii.',
  '<p>Salut!</p><p>Mă numesc Ciprian și am 12 ani. Particip la competiții de atletism.</p><p>Mi-aș dori pantofi de alergare și o sticlă sport reutilizabilă.</p><p>Mulțumesc,<br>Ciprian</p>',
  'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=400',
  215,
  'Comunitatea Lumina',
  'raising'
),
(
  'Florin Sava',
  'Florin bate toba la cercul artistic.',
  '<p>Salut!</p><p>Sunt Florin și am 11 ani. Învăț ritmuri noi de tobe.</p><p>Mi-ar plăcea un pad de exerciții și bețe noi.</p><p>Cu mulțumiri,<br>Florin</p>',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
  180,
  'Comunitatea Lumina',
  'raising'
),
(
  'Paul Rusu',
  'Paul rezolvă probleme de logică.',
  '<p>Dragă susținător,</p><p>Sunt Paul și am 10 ani. Profesorul meu spune că am talent la matematică.</p><p>Mi-aș dori caiete cu probleme de logică și un abac modern.</p><p>Mulțumesc,<br>Paul</p>',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=400',
  170,
  'Comunitatea Lumina',
  'raising'
),
(
  'Cezar Barbu',
  'Cezar construiește modele din piese Lego.',
  '<p>Bună!</p><p>Mă numesc Cezar, am 9 ani și ador să inventez mașinării.</p><p>Mi-aș dori un set Lego tehnic și o cutie pentru depozitare.</p><p>Cu recunoștință,<br>Cezar</p>',
  'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=400',
  240,
  'Comunitatea Lumina',
  'raising'
),
(
  'Dan Iacob',
  'Dan învață să construiască aparate radio.',
  '<p>Dragă prieten,</p><p>Sunt Dan și am 13 ani. Lucrez cu tatăl meu la proiecte electronice.</p><p>Mi-aș dori un kit radio DIY și instrumente de lipit sigure pentru copii.</p><p>Mulțumesc,<br>Dan</p>',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
  255,
  'Comunitatea Lumina',
  'raising'
),
(
  'Robert Luca',
  'Robert compune melodii la pianul școlii.',
  '<p>Salut!</p><p>Mă numesc Robert și am 12 ani. Exersez zilnic pe pianul vechi al școlii.</p><p>Mi-ar plăcea o clapă electronică mică și căști pentru repetiții.</p><p>Cu drag,<br>Robert</p>',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=401',
  300,
  'Comunitatea Lumina',
  'raising'
),
(
  'Emanuel Zaharia',
  'Emanuel studiază lumea microscopică.',
  '<p>Dragă donator,</p><p>Sunt Emanuel și am 11 ani. Mă fascinează insectele și plantele mici.</p><p>Mi-aș dori un microscop pentru copii și lame de observare.</p><p>Mulțumesc,<br>Emanuel</p>',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400',
  290,
  'Comunitatea Lumina',
  'raising'
),
(
  'Roxana Petre',
  'Roxana joacă teatru cu prietenii ei.',
  '<p>Bună ziua,</p><p>Sunt Roxana și am 10 ani. Organizez mici scenete la școală.</p><p>Mi-aș dori costume simple și un set de lumini pentru scenă.</p><p>Mulțumesc,<br>Roxana</p>',
  'https://images.unsplash.com/photo-1545239351-101833f40508?w=400',
  210,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Teodora Halip',
  'Teodora vrea să învețe să cânte la vioară.',
  '<p>Dragă prieten,</p><p>Mă numesc Teodora și am 9 ani. Îmi doresc să cânt melodii line.</p><p>Mi-aș dori o vioară pentru copii și manuale de studiu.</p><p>Cu recunoștință,<br>Teodora</p>',
  'https://images.unsplash.com/photo-1494955464529-790512c65305?w=400',
  320,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Ingrid Roman',
  'Ingrid ajută bunica la gătit prăjituri.',
  '<p>Salut!</p><p>Sunt Ingrid și am 8 ani. Îmi plac prăjiturile de casă.</p><p>Mi-aș dori ustensile de patiserie pentru copii și o carte cu rețete ușoare.</p><p>Mulțumesc,<br>Ingrid</p>',
  'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=400',
  180,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Iulia Preda',
  'Iulia se plimbă pe role prin cartier.',
  '<p>Bună!</p><p>Mă numesc Iulia și am 11 ani. Îmi place să mă dau cu rolele.</p><p>Mi-aș dori role reglabile și echipament de protecție.</p><p>Cu mult drag,<br>Iulia</p>',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  240,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Alina Borcea',
  'Alina studiază constelațiile.',
  '<p>Dragă susținător,</p><p>Sunt Alina și am 12 ani. Stau noaptea cu tatăl meu și privim cerul.</p><p>Mi-ar plăcea un planisfer și cărți despre astronomie.</p><p>Mulțumesc,<br>Alina</p>',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400',
  210,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Oana Mirea',
  'Oana pictează flori pe pânză.',
  '<p>Salut!</p><p>Mă numesc Oana și am 10 ani. Ador să pictez flori sălbatice.</p><p>Mi-aș dori un șevalet portabil și pânze.</p><p>Mulțumesc,<br>Oana</p>',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
  230,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Adriana Radoi',
  'Adriana scrie povești pentru revista școlii.',
  '<p>Dragă prieten,</p><p>Sunt Adriana și am 13 ani. Mă inspir din poveștile bunicii.</p><p>Mi-aș dori un laptop second-hand și o husă protectoare.</p><p>Mulțumesc,<br>Adriana</p>',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
  310,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Catalina Buzatu',
  'Catalina cântă în corul bisericii.',
  '<p>Bună ziua,</p><p>Mă numesc Catalina și am 11 ani. Îmi place să cânt colinde.</p><p>Mi-aș dori partituri noi și un afinator.</p><p>Mulțumesc,<br>Catalina</p>',
  'https://images.unsplash.com/photo-1448646965692-9d94e2613cf3?w=400',
  190,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Dragos Mihalache',
  'Dragos joacă șah cu bunicul.',
  '<p>Salut!</p><p>Sunt Dragos și am 10 ani. Joc șah în fiecare duminică.</p><p>Mi-ar plăcea un set de șah profesional și un manual de strategii.</p><p>Mulțumesc,<br>Dragos</p>',
  'https://images.unsplash.com/photo-1529692236671-f1dc5bdf53a6?w=400',
  200,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Andreea Serban',
  'Andreea scrie și ilustrează basme.',
  '<p>Dragă prieten,</p><p>Sunt Andreea și am 9 ani. Îmi place să inventez povești despre lumi magice.</p><p>Mi-aș dori caiete de desen și creioane acuarelabile.</p><p>Cu recunoștință,<br>Andreea</p>',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
  180,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Loredana Lupescu',
  'Loredana repetă dansuri populare.',
  '<p>Bună!</p><p>Mă numesc Loredana și am 12 ani. Dansez în ansamblul folcloric local.</p><p>Mi-ar plăcea opinci noi și o ie tradițională.</p><p>Mulțumesc,<br>Loredana</p>',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=401',
  260,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Matei Stefanescu',
  'Matei construiește roboți din piese reciclate.',
  '<p>Dragă donator,</p><p>Sunt Matei și am 11 ani. Refolosesc piese vechi pentru proiectele mele.</p><p>Mi-aș dori un set de senzori și un microcontroller simplu.</p><p>Mulțumesc,<br>Matei</p>',
  'https://images.unsplash.com/photo-1545239351-10efd3ef23c0?w=400',
  275,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Camelia Moldoveanu',
  'Camelia învață să coasă la mașina veche a mamei.',
  '<p>Salut!</p><p>Mă numesc Camelia și am 13 ani. Creez haine pentru păpuși.</p><p>Mi-aș dori materiale textile și un set de croitorie pentru începători.</p><p>Cu drag,<br>Camelia</p>',
  'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400',
  220,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Andra Vasile',
  'Andra fotografiază natura din jurul satului.',
  '<p>Dragă prieten,</p><p>Sunt Andra și am 12 ani. Fotografiez cu telefonul bunicii.</p><p>Mi-ar plăcea un aparat foto compact și un trepied mic.</p><p>Mulțumesc,<br>Andra</p>',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
  310,
  'Comunitatea Bucuria',
  'raising'
),
(
  'Petru Tanase',
  'Petru construiește obiecte din lemn.',
  '<p>Bună ziua,</p><p>Sunt Petru și am 11 ani. Îmi place să fac rame și cutii din lemn.</p><p>Mi-aș dori un set de scule sigure pentru copii și lemn pentru proiecte.</p><p>Mulțumesc,<br>Petru</p>',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
  230,
  'Comunitatea Armonia',
  'raising'
),
(
  'Crina Stoica',
  'Crina are grijă de grădina comunitară.',
  '<p>Salut!</p><p>Mă numesc Crina și am 10 ani. Cultiv flori și legume cu bunicii.</p><p>Mi-ar plăcea un set de unelte de grădină pentru copii și semințe.</p><p>Mulțumesc,<br>Crina</p>',
  'https://images.unsplash.com/photo-1465406325900-47f2b1b5ae3d?w=400',
  160,
  'Comunitatea Armonia',
  'raising'
),
(
  'Rares Dumitru',
  'Rares joacă baschet în curtea școlii.',
  '<p>Dragă donator,</p><p>Sunt Rares și am 12 ani. Vreau să devin fundaș.</p><p>Mi-aș dori o minge de baschet și un set de conuri pentru antrenament.</p><p>Mulțumesc,<br>Rares</p>',
  'https://images.unsplash.com/photo-1505666284585-e82c4a28350c?w=400',
  210,
  'Comunitatea Armonia',
  'raising'
),
(
  'Teodor Marin',
  'Teodor visează la ture lungi cu bicicleta.',
  '<p>Bună ziua,</p><p>Sunt Teodor și am 11 ani. Merg zilnic la școală pe bicicletă.</p><p>Mi-aș dori o bicicletă robustă și un set de reflectorizante.</p><p>Mulțumesc,<br>Teodor</p>',
  'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=401',
  320,
  'Comunitatea Armonia',
  'raising'
),
(
  'Madalina Iordache',
  'Madalina realizează decoruri handmade.',
  '<p>Dragă prieten,</p><p>Sunt Madalina și am 9 ani. Fac ornamente pentru sărbători.</p><p>Mi-aș dori lipici special, panglici și hârtie colorată.</p><p>Mulțumesc,<br>Madalina</p>',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
  180,
  'Comunitatea Armonia',
  'raising'
),
(
  'Sorin Vizitiu',
  'Sorin învață ritmuri la percuție.',
  '<p>Salut!</p><p>Sunt Sorin și am 13 ani. Îmi place să cânt la cajon.</p><p>Mi-aș dori o pereche de bongos și un metronom.</p><p>Mulțumesc,<br>Sorin</p>',
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=402',
  245,
  'Comunitatea Armonia',
  'raising'
),
(
  'Irina Bratu',
  'Irina joacă în trupa de teatru a școlii.',
  '<p>Dragă susținător,</p><p>Sunt Irina și am 12 ani. Repetăm o piesă despre prietenie.</p><p>Mi-aș dori decoruri și machiaj de scenă pentru copii.</p><p>Mulțumesc,<br>Irina</p>',
  'https://images.unsplash.com/photo-1515169067865-5387ec356754?w=400',
  205,
  'Comunitatea Armonia',
  'raising'
),
(
  'Cosmin Apostol',
  'Cosmin visează să exploreze munții.',
  '<p>Bună!</p><p>Mă numesc Cosmin și am 11 ani. Merg cu tata pe trasee scurte.</p><p>Mi-aș dori bocanci de drumeție și un rucsac.</p><p>Mulțumesc,<br>Cosmin</p>',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=402',
  275,
  'Comunitatea Armonia',
  'raising'
),
(
  'Laura Conea',
  'Laura citește romane pentru adolescenți.',
  '<p>Dragă prieten,</p><p>Sunt Laura și am 13 ani. Îmi place să citesc în balcon.</p><p>Mi-aș dori romane noi și o lampă de citit.</p><p>Mulțumesc,<br>Laura</p>',
  'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=400',
  190,
  'Comunitatea Armonia',
  'raising'
),
(
  'Sebastian Dobre',
  'Sebastian programează roboței din lego.',
  '<p>Salut!</p><p>Sunt Sebastian și am 12 ani. Particip la concursuri de robotică.</p><p>Mi-aș dori un set Lego Mindstorms folosit și manuale.</p><p>Mulțumesc,<br>Sebastian</p>',
  'https://images.unsplash.com/photo-1559027615-5c07c1e83876?w=400',
  330,
  'Comunitatea Armonia',
  'raising'
),
(
  'Mihaela Stoenescu',
  'Mihaela pictează icoane pe sticlă.',
  '<p>Dragă donator,</p><p>Sunt Mihaela și am 10 ani. Învăț de la mătușa mea să pictez icoane.</p><p>Mi-aș dori culori speciale și rame.</p><p>Mulțumesc,<br>Mihaela</p>',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
  215,
  'Comunitatea Armonia',
  'raising'
),
(
  'George Ilinca',
  'George construiește rachete din carton.',
  '<p>Bună ziua,</p><p>Sunt George și am 9 ani. Îmi place să văd rachetele cum zboară.</p><p>Mi-aș dori materiale pentru rachetomodelism și o carte cu instrucțiuni.</p><p>Mulțumesc,<br>George</p>',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=400',
  205,
  'Comunitatea Armonia',
  'raising'
),
(
  'Amalia Vasilescu',
  'Amalia visează să devină fotograf.',
  '<p>Salut!</p><p>Sunt Amalia și am 12 ani. Fac fotografii cu telefonul mamei.</p><p>Mi-aș dori un aparat foto simplu și card de memorie.</p><p>Mulțumesc,<br>Amalia</p>',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=401',
  315,
  'Comunitatea Armonia',
  'raising'
),
(
  'Ilie Cornea',
  'Ilie ajută la stână și se pregătește pentru iarnă.',
  '<p>Dragă prieten,</p><p>Sunt Ilie și am 11 ani. Stau lângă stână mult timp.</p><p>Mi-aș dori bocanci călduroși și un pulover de lână.</p><p>Mulțumesc,<br>Ilie</p>',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=401',
  230,
  'Comunitatea Armonia',
  'raising'
),
(
  'Natalia Petrescu',
  'Natalia studiază baletul.',
  '<p>Dragă susținător,</p><p>Sunt Natalia și am 8 ani. Dansez balet de doi ani.</p><p>Mi-aș dori poante noi și o saltea de încălzire.</p><p>Mulțumesc,<br>Natalia</p>',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=402',
  265,
  'Comunitatea Armonia',
  'raising'
);
