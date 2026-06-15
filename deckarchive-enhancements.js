(function () {
  const TEXT_STORE_KEY = "deckarchive:text-edits:v1";
  const GAME_STORE_KEY = "deckarchive:game-nights:v1";
  const DRAFT_CAPTURE_ENDPOINT = "http://127.0.0.1:4182/drafts";
  const TEXT_EDIT_SEED = {
    "71pih4": {
      original: "Decks, salt, lore, and several questionable life choices.",
      value: "Salt Bois on Tour",
    },
    u5m83l: {
      original:
        "A fantasy-styled archive for the playgroup's Commander decks, complete with Scryfall art, roast text, searchable archetypes, and calculated pod analysis.",
      value:
        "An extremely nerdy waste of time to get a good overview of all decks and Magic Nights. Useful? No. But beautifully set up? Also no. However, it is our heap of salt.",
    },
    "6b2y44": {
      original: "Dromoka",
      value: "Dragonlord Dromoka",
    },
    jw9apj: {
      original:
        "Lifegain commander that tries to win through Aetherflux Reservoir or commander damage. Strong commander and plenty of interaction, but the deck can feel unfocused enough that it does not always become a major threat.",
      value:
        "Lifegain commander that tries to win through Aetherflux Reservoir or commander damage. Has maybe yet to win, but surely is a threat (and a nuisance) at the table.",
    },
    d5v2ls: {
      original:
        "Friendly toughness-matters deck with creatures like 0/6s and 2/10s that attack using toughness thanks to Arcades. Synergistic, linear, a little dull to pilot, but a solid mid-table deck.",
      value:
        "Friendly toughness-matters deck with creatures like 0/6s and 2/10s that attack using toughness thanks to Arcades. Synergistic, linear, a extremely dull to pilot, but a solid mid-table deck.",
    },
    kij9s4: {
      original:
        "This deck looks like it is just doing regular Gruul things until Huub suddenly delivers personal greetings from the sponsor.",
      value:
        "This deck was never viewed as a big threat before, but since recently it is an official Pieter Beater\u2122. An official force to be reckoned with.",
    },
    zvdd92: {
      original:
        "This deck proves Magic is no longer safe from extended universe nonsense: sometimes you just get beaten down by a Turtle with plot armor.",
      value:
        "This deck proves Magic is no longer safe from extended universe nonsense: sometimes you just get beaten to death by a Turtle with plot armor.",
    },
    "1pb5f9b": {
      original: "This deck gains life like it is holy, then removes your board like it is personal.",
      value: "This deck gains life like it is holy but trust me, its master is hellish.",
    },
    "1r6wxi3": {
      original:
        "This deck spends six turns pretending to be slow and reasonable, then drops Mass Land Denial and Jin-Gitaxias like that is normal pod behavior.",
      value:
        "This deck spends six turns pretending to be slow and reasonable, then drops Mass Land Denial and Jin-Gitaxias because frankly, Bjarne's just a dick.",
    },
    "1ir46qd": {
      original:
        "Sultai morph control deck that plays cards face down for free, constantly draws cards, and forces the table to guess what is hiding under every creature. Raffine may be stronger on paper, but Kadena wins surprisingly often.",
      value:
        "Sultai morph control deck that plays cards face down for free, constantly draws cards, and forces the table to guess what is hiding under every creature. Raffine may be stronger on paper, but Kadena's a real bitch to deal with.",
    },
    "1nzbi7": {
      original:
        "Every sentence here is calculated from the deck scores. The sarcasm is automated; the blame remains personal.",
      value: "Every sentence here is calculated from the deck scores. The data is automated; the blame remains personal.",
    },
    "1oj8fzp": {
      original:
        "There is a recurring belief that Huub forgets his lands at home, because somehow the mana base keeps becoming a character in the story.",
      value: "If he remembered to bring his lands, his decks can surprise you when underestimated.",
    },
    z8p6nv: {
      original:
        "If Lenny says he is just setting up, he is probably already three triggers away from making the table regret patience.",
      value:
        "If Lenny says he is just setting up, he is probably already three triggers away from making the table regret showing up.",
    },
    "1ponyz9": {
      original:
        "Joost loves foils, expensive staples, and general value pieces. The pod's standing joke is that if his deck building ever caught up with his card budget, everyone would be in real danger.",
      value:
        "Joost loves foils, expensive staples, and general value pieces; everything is handpicked. The deck may be shiny enough to blind you before it actually kills you. If his deck building ever caught up with his card budget, everyone would be in real danger.",
    },
    "1jea1oq": {
      original: "The deck may be shiny enough to blind you before it actually kills you.",
      value:
        "Partial to a gamble and barely mulligans for love of the game: he's proof that you only need one opening hand.",
    },
    "1ool01a": {
      original:
        "The result is often smart Magic, frustrating Magic, and occasionally the exact reason the rating system needed more granularity.",
      value:
        "The result is often annoyances all around, he's lucky his friends up the degeneracy themselves instead of kicking him out. They've yet tot tell him its part of a Make-A-Wish campaign.",
    },
  };
  const PRIMARY_PLAYERS = ["Lenny", "Joost", "Huub", "Bjarne"];
  const NIGHT_TAGS = [
    "Close finish",
    "Counterspellfest",
    "Sluggish",
    "Salt spike",
    "Big comeback",
    "Politics",
    "Mana issues",
    "Long turns",
    "Combo scare",
    "Guest win",
  ];

  let editMode = false;
  let observerQueued = false;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function waitForApp(callback) {
    const app = document.querySelector(".app-shell");
    if (app) {
      callback(app);
      return;
    }
    window.setTimeout(() => waitForApp(callback), 60);
  }

  function loadJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function textHash(value) {
    let hash = 5381;
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash * 33) ^ value.charCodeAt(index);
    }
    return (hash >>> 0).toString(36);
  }

  function cleanText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function loadTextEdits() {
    return { ...TEXT_EDIT_SEED, ...loadJson(TEXT_STORE_KEY, {}) };
  }

  function saveTextEdit(element) {
    const key = element.dataset.editKey;
    const original = element.dataset.editOriginal;
    if (!key || !original) return;
    const value = cleanText(element.textContent);
    const edits = loadTextEdits();
    if (!value || value === original) {
      delete edits[key];
    } else {
      edits[key] = { original, value };
    }
    saveJson(TEXT_STORE_KEY, edits);
    setEditStatus("Draft saved");
  }

  function isEditableTextElement(element) {
    if (!element || !element.textContent) return false;
    if (
      element.closest(
        ".tab-nav, .site-edit-controls, .game-night-form, .game-night-actions, .game-night-delete"
      )
    ) {
      return false;
    }
    if (element.matches("button, input, textarea, select, option, svg, canvas")) return false;
    if (element.classList.contains("mana-dot")) return false;
    if (element.querySelector("svg, input, textarea, select, button, canvas")) return false;
    if (element.children.length > 0 && !element.matches("blockquote")) return false;
    return cleanText(element.textContent).length > 1;
  }

  function scanTextElements() {
    return Array.from(
      document.querySelectorAll(
        ".app-shell h1, .app-shell h2, .app-shell h3, .app-shell h4, .app-shell p, .app-shell blockquote, .app-shell strong, .app-shell small, .app-shell span, .app-shell dt, .app-shell dd"
      )
    ).filter(isEditableTextElement);
  }

  function prepareTextElement(element) {
    if (!element.dataset.editOriginal) {
      const original = cleanText(element.textContent);
      element.dataset.editOriginal = original;
      element.dataset.editKey = textHash(original);
    }
  }

  function applyTextEdits() {
    const edits = loadTextEdits();
    scanTextElements().forEach((element) => {
      prepareTextElement(element);
      const edit = edits[element.dataset.editKey];
      if (edit && document.activeElement !== element && cleanText(element.textContent) !== edit.value) {
        element.textContent = edit.value;
      }
    });
  }

  function enableTextEditing() {
    applyTextEdits();
    scanTextElements().forEach((element) => {
      prepareTextElement(element);
      element.contentEditable = "true";
      element.spellcheck = true;
      element.classList.add("is-editable-text");
      element.setAttribute("aria-label", "Editable text");
    });
  }

  function disableTextEditing() {
    scanTextElements().forEach((element) => {
      element.contentEditable = "false";
      element.classList.remove("is-editable-text");
      element.removeAttribute("aria-label");
    });
  }

  function setEditStatus(text) {
    const status = document.querySelector("[data-edit-status]");
    if (status) status.textContent = text;
  }

  function createEditControls() {
    if (document.querySelector(".site-edit-controls")) return;
    const isLocalPreview =
      location.protocol === "file:" || ["127.0.0.1", "localhost", "::1"].includes(location.hostname);
    const controls = document.createElement("div");
    controls.className = "site-edit-controls";
    controls.innerHTML = [
      '<button type="button" class="site-edit-button" data-edit-toggle>Edit</button>',
      isLocalPreview
        ? '<button type="button" class="site-edit-button quiet" data-save-text-drafts hidden>Save text</button>'
        : "",
      '<button type="button" class="site-edit-button quiet" data-edit-reset hidden>Reset drafts</button>',
      '<span class="site-edit-status" data-edit-status hidden>Draft saved</span>',
    ].join("");
    document.body.appendChild(controls);
  }

  function setEditMode(enabled) {
    editMode = enabled;
    document.body.classList.toggle("site-editing", enabled);
    const toggle = document.querySelector("[data-edit-toggle]");
    const reset = document.querySelector("[data-edit-reset]");
    const saveDrafts = document.querySelector("[data-save-text-drafts]");
    const status = document.querySelector("[data-edit-status]");
    if (toggle) toggle.textContent = enabled ? "Done" : "Edit";
    if (reset) reset.hidden = !enabled;
    if (saveDrafts) saveDrafts.hidden = !enabled;
    if (status) status.hidden = !enabled;
    if (enabled) enableTextEditing();
    else disableTextEditing();
  }

  async function saveTextDraftsToCodex() {
    const raw = window.localStorage.getItem(TEXT_STORE_KEY) || "{}";
    const count = Object.keys(loadJson(TEXT_STORE_KEY, {})).length;
    if (!count) {
      setEditStatus("No text drafts found");
      return;
    }
    try {
      const response = await fetch(DRAFT_CAPTURE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          href: location.href,
          capturedAt: new Date().toISOString(),
          key: TEXT_STORE_KEY,
          raw,
        }),
      });
      if (!response.ok) throw new Error("Save failed");
      setEditStatus(`Saved ${count} text drafts`);
    } catch {
      try {
        await navigator.clipboard.writeText(raw);
        setEditStatus("Copied drafts");
      } catch {
        setEditStatus("Could not save drafts");
      }
    }
  }

  function resetTextDrafts() {
    window.localStorage.removeItem(TEXT_STORE_KEY);
    setEditStatus("Drafts reset");
    window.location.reload();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    if (!value) return "Undated";
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadGameNights() {
    return loadJson(GAME_STORE_KEY, []);
  }

  function saveGameNights(entries) {
    saveJson(GAME_STORE_KEY, entries);
  }

  function tally(values) {
    return values.reduce((counts, value) => {
      if (!value) return counts;
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }

  function topCount(counts) {
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return entries[0] || null;
  }

  function entryGames(entry) {
    if (Array.isArray(entry.games) && entry.games.length) {
      return entry.games
        .map((game, index) => ({
          number: game.number || index + 1,
          winner: String(game.winner || "").trim(),
          deck: String(game.deck || game.winningDeck || "").trim(),
        }))
        .filter((game) => game.winner || game.deck);
    }
    if (entry.winner || entry.winningDeck) {
      return [
        {
          number: 1,
          winner: String(entry.winner || "").trim(),
          deck: String(entry.winningDeck || "").trim(),
        },
      ];
    }
    return [];
  }

  function inferNightWinner(games) {
    const counts = tally(games.map((game) => game.winner));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!sorted.length) return "";
    if (games.length === 1) return sorted[0][0];
    if (sorted[0][1] > 1 && sorted[0][1] > (sorted[1]?.[1] || 0)) return sorted[0][0];
    return "";
  }

  function nightWinner(entry) {
    return String(entry.nightWinner || "").trim() || inferNightWinner(entryGames(entry));
  }

  function uniqueGuestNames(entries) {
    const names = new Set();
    entries.forEach((entry) => {
      (entry.participants || []).forEach((name) => {
        if (!PRIMARY_PLAYERS.includes(name)) names.add(name);
      });
      entryGames(entry).forEach((game) => {
        if (game.winner && !PRIMARY_PLAYERS.includes(game.winner)) names.add(game.winner);
      });
      const overall = nightWinner(entry);
      if (overall && !PRIMARY_PLAYERS.includes(overall)) names.add(overall);
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }

  function renderGameStats(entries) {
    const allGames = entries.flatMap(entryGames);
    const gameWinnerCounts = tally(allGames.map((game) => game.winner));
    const nightWinnerCounts = tally(entries.map(nightWinner));
    const deckCounts = tally(allGames.map((game) => game.deck));
    const tagCounts = tally(entries.flatMap((entry) => entry.tags || []));
    const topNightWinner = topCount(nightWinnerCounts);
    const topGameWinner = topCount(gameWinnerCounts);
    const topDeck = topCount(deckCounts);
    const topTag = topCount(tagCounts);
    const guestGameWins = allGames.filter((game) => game.winner && !PRIMARY_PLAYERS.includes(game.winner)).length;
    const statCards = [
      ["Nights logged", entries.length || "0", "Weekly records"],
      ["Games logged", allGames.length || "0", "Individual games"],
      ["Night leader", topNightWinner ? `${topNightWinner[0]} (${topNightWinner[1]})` : "Open table", "Evening wins"],
      ["Game leader", topGameWinner ? `${topGameWinner[0]} (${topGameWinner[1]})` : "No games yet", "Game wins"],
      ["Deck to beat", topDeck ? `${topDeck[0]} (${topDeck[1]})` : "No deck yet", "Winning decks"],
      ["Table weather", topTag ? `${topTag[0]} (${topTag[1]})` : "Uncharted", "Recurring vibe"],
      ["Guest game wins", guestGameWins, "Off-roster victories"],
      ["Counterspellfests", tagCounts.Counterspellfest || 0, "Blue-table warnings"],
    ];

    const playerNames = PRIMARY_PLAYERS.concat(uniqueGuestNames(entries));
    const playerRows = playerNames
      .map((name) => {
        const played = entries.filter((entry) => (entry.participants || []).includes(name)).length;
        const gameWins = gameWinnerCounts[name] || 0;
        const nightWins = nightWinnerCounts[name] || 0;
        const rate = played ? `${Math.round((nightWins / played) * 100)}%` : "0%";
        return `<tr><td>${escapeHtml(name)}</td><td>${played}</td><td>${gameWins}</td><td>${nightWins}</td><td>${rate}</td></tr>`;
      })
      .join("");

    const tagRows =
      Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([tag, count]) => `<span>${escapeHtml(tag)} <strong>${count}</strong></span>`)
        .join("") || '<span>Awaiting notable events <strong>0</strong></span>';

    return `
      <section class="game-night-stat-grid">
        ${statCards
          .map(
            ([label, value, detail]) => `
              <article class="game-night-stat">
                <p>${escapeHtml(label)}</p>
                <strong>${escapeHtml(value)}</strong>
                <span>${escapeHtml(detail)}</span>
              </article>
            `
          )
          .join("")}
      </section>
      <section class="game-night-two-column">
        <article class="game-night-card">
          <p class="eyebrow">Player tracker</p>
          <h3>Primaries and guests</h3>
          <table class="game-night-table">
            <thead><tr><th>Player</th><th>Nights</th><th>Game wins</th><th>Night wins</th><th>Rate</th></tr></thead>
            <tbody>${playerRows}</tbody>
          </table>
        </article>
        <article class="game-night-card">
          <p class="eyebrow">Noticeable table texture</p>
          <h3>Vibe tags</h3>
          <div class="game-night-tag-cloud">${tagRows}</div>
        </article>
      </section>
    `;
  }

  function renderEntryList(entries) {
    if (!entries.length) {
      return `
        <section class="empty-state game-night-empty">
          <h3>No game nights logged yet</h3>
          <p>The first weekly record will appear here after it is added.</p>
        </section>
      `;
    }

    return `
      <section class="game-night-list" aria-label="Logged Magic nights">
        ${entries
          .map((entry) => {
            const games = entryGames(entry);
            const overall = nightWinner(entry);
            const gameRows = games
              .map(
                (game) => `
                  <li>
                    <span>Game ${escapeHtml(game.number)}</span>
                    <strong>${escapeHtml(game.winner || "Unknown winner")}</strong>
                    <em>${escapeHtml(game.deck || "Unknown deck")}</em>
                  </li>
                `
              )
              .join("");
            return `
              <article class="game-night-entry">
                <div>
                  <p class="eyebrow">${escapeHtml(formatDate(entry.date))}</p>
                  <h3>${escapeHtml(overall || "No clear night winner")}</h3>
                  <strong>${games.length} ${games.length === 1 ? "game" : "games"} logged</strong>
                </div>
                <p>${escapeHtml(entry.description || "No table notes yet.")}</p>
                <ol class="game-night-games-list">${gameRows}</ol>
                <div class="game-night-meta">
                  <span>Players: ${escapeHtml((entry.participants || []).join(" / ") || "Unlisted")}</span>
                  <span>Tags: ${escapeHtml((entry.tags || []).join(" / ") || "None")}</span>
                </div>
                <button type="button" class="game-night-delete" data-delete-log="${escapeHtml(entry.id)}">Delete</button>
              </article>
            `;
          })
          .join("")}
      </section>
    `;
  }

  function gameResultRow(number) {
    return `
      <div class="game-night-game-row">
        <span>Game ${number}</span>
        <label>Winner
          <input type="text" name="gameWinner" list="game-night-player-names" placeholder="Player name">
        </label>
        <label>Deck
          <input type="text" name="gameDeck" placeholder="Winning deck">
        </label>
      </div>
    `;
  }

  function gameNightForm(entries) {
    const knownGuests = uniqueGuestNames(entries);
    const datalistNames = PRIMARY_PLAYERS.concat(knownGuests)
      .map((name) => `<option value="${escapeHtml(name)}"></option>`)
      .join("");
    const primaryCheckboxes = PRIMARY_PLAYERS.map(
      (name) => `
        <label class="checkbox-row">
          <input type="checkbox" name="player-${escapeHtml(name)}" checked>
          <span>${escapeHtml(name)}</span>
        </label>
      `
    ).join("");
    const tagCheckboxes = NIGHT_TAGS.map(
      (tag) => `
        <label class="checkbox-row compact">
          <input type="checkbox" name="night-tag" value="${escapeHtml(tag)}">
          <span>${escapeHtml(tag)}</span>
        </label>
      `
    ).join("");

    return `
      <section class="game-night-card">
        <form class="game-night-form">
          <div class="game-night-form-grid">
            <label>Date
              <input type="date" name="date" value="${today()}" required>
            </label>
            <label>Night winner
              <input type="text" name="nightWinner" list="game-night-player-names" placeholder="Overall winner, if any">
            </label>
          </div>
          <datalist id="game-night-player-names">${datalistNames}</datalist>
          <label>Night notes
            <textarea name="description" placeholder="Short story of how the night went"></textarea>
          </label>
          <div class="game-night-fieldset">
            <p class="eyebrow">Game results</p>
            <div class="game-night-games">
              ${[1, 2, 3].map(gameResultRow).join("")}
            </div>
            <button type="button" class="icon-button quiet" data-add-game>Add game</button>
          </div>
          <div class="game-night-fieldset">
            <p class="eyebrow">Players present</p>
            <div class="game-night-check-grid">${primaryCheckboxes}</div>
            <label>Guests
              <input type="text" name="guests" placeholder="Guest names, separated by commas">
            </label>
          </div>
          <div class="game-night-fieldset">
            <p class="eyebrow">Notable events</p>
            <div class="game-night-check-grid tags">${tagCheckboxes}</div>
          </div>
          <div class="game-night-actions">
            <button type="submit" class="icon-button">Add night</button>
            <span data-game-night-status></span>
          </div>
        </form>
      </section>
    `;
  }

  function renderGameNightPanel() {
    const container = document.querySelector(".tab-content");
    if (!container) return;
    let panel = document.querySelector(".game-night-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "game-night-panel";
      container.appendChild(panel);
    }
    const entries = loadGameNights().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    panel.innerHTML = `
      <section class="section-heading">
        <p class="eyebrow">Game Night Log</p>
        <h2>Weekly battle records</h2>
        <p>Wins, decks, guests, and table weather for future Magic nights.</p>
      </section>
      ${gameNightForm(entries)}
      ${renderEntryList(entries)}
      ${renderGameStats(entries)}
    `;
    if (editMode) enableTextEditing();
  }

  function showGameNightTab() {
    const nav = document.querySelector(".tab-nav");
    const container = document.querySelector(".tab-content");
    if (!nav || !container) return;
    nav.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
    const button = nav.querySelector("[data-game-night-tab]");
    if (button) button.classList.add("active");
    container.classList.add("game-night-mode");
    renderGameNightPanel();
  }

  function hideGameNightTab() {
    const container = document.querySelector(".tab-content");
    const button = document.querySelector("[data-game-night-tab]");
    if (button) button.classList.remove("active");
    if (container) container.classList.remove("game-night-mode");
  }

  function ensureGameNightTab() {
    const nav = document.querySelector(".tab-nav");
    if (!nav || nav.querySelector("[data-game-night-tab]")) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.gameNightTab = "true";
    button.textContent = "Game Night Log";
    const firstButton = nav.querySelector("button");
    if (firstButton && firstButton.nextSibling) {
      nav.insertBefore(button, firstButton.nextSibling);
    } else {
      nav.appendChild(button);
    }
  }

  function handleGameNightSubmit(event) {
    const form = event.target.closest(".game-night-form");
    if (!form) return;
    event.preventDefault();
    const formData = new FormData(form);
    const date = String(formData.get("date") || "").trim();
    const submittedNightWinner = String(formData.get("nightWinner") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const winners = formData.getAll("gameWinner").map((value) => String(value).trim());
    const decks = formData.getAll("gameDeck").map((value) => String(value).trim());
    const games = winners
      .map((winner, index) => ({
        number: index + 1,
        winner,
        deck: decks[index] || "",
      }))
      .filter((game) => game.winner || game.deck);
    const guests = String(formData.get("guests") || "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
    const participants = PRIMARY_PLAYERS.filter((name) => formData.get(`player-${name}`)).concat(guests);
    const tags = formData.getAll("night-tag").map(String);
    const actualNightWinner = submittedNightWinner || inferNightWinner(games);
    games.forEach((game) => {
      if (game.winner && !participants.includes(game.winner)) participants.push(game.winner);
    });
    if (actualNightWinner && !participants.includes(actualNightWinner)) participants.push(actualNightWinner);
    const status = form.querySelector("[data-game-night-status]");
    const incompleteGame = games.some((game) => !game.winner || !game.deck);
    if (!date || !games.length || incompleteGame) {
      if (status) status.textContent = "Date and complete game results are needed.";
      return;
    }
    const entries = loadGameNights();
    entries.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date,
      nightWinner: actualNightWinner,
      games,
      description,
      participants,
      tags,
    });
    saveGameNights(entries);
    renderGameNightPanel();
  }

  function deleteGameNight(id) {
    if (!window.confirm("Delete this local game-night entry?")) return;
    saveGameNights(loadGameNights().filter((entry) => entry.id !== id));
    renderGameNightPanel();
  }

  function addGameRow(form) {
    const list = form.querySelector(".game-night-games");
    if (!list) return;
    const nextNumber = list.querySelectorAll(".game-night-game-row").length + 1;
    list.insertAdjacentHTML("beforeend", gameResultRow(nextNumber));
  }

  function installListeners() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.matches("[data-edit-toggle]")) {
        setEditMode(!editMode);
        return;
      }
      if (target.matches("[data-edit-reset]")) {
        resetTextDrafts();
        return;
      }
      if (target.matches("[data-save-text-drafts]")) {
        saveTextDraftsToCodex();
        return;
      }
      if (target.matches("[data-game-night-tab]")) {
        showGameNightTab();
        return;
      }
      if (target.matches("[data-delete-log]")) {
        deleteGameNight(target.getAttribute("data-delete-log"));
        return;
      }
      if (target.matches("[data-add-game]")) {
        const form = target.closest(".game-night-form");
        if (form) addGameRow(form);
        return;
      }
      if (target.closest(".tab-nav button") && !target.closest("[data-game-night-tab]")) {
        hideGameNightTab();
      }
    });

    document.addEventListener("submit", handleGameNightSubmit);
    document.addEventListener("input", (event) => {
      const target = event.target;
      if (editMode && target instanceof HTMLElement && target.classList.contains("is-editable-text")) {
        saveTextEdit(target);
      }
    });
    document.addEventListener("paste", (event) => {
      const target = event.target;
      if (!editMode || !(target instanceof HTMLElement) || !target.classList.contains("is-editable-text")) return;
      event.preventDefault();
      const text = event.clipboardData ? event.clipboardData.getData("text/plain") : "";
      document.execCommand("insertText", false, text);
    });
  }

  function observeApp(app) {
    const observer = new MutationObserver(() => {
      if (observerQueued) return;
      observerQueued = true;
      window.setTimeout(() => {
        observerQueued = false;
        ensureGameNightTab();
        applyTextEdits();
        if (editMode) enableTextEditing();
      }, 40);
    });
    observer.observe(app, { childList: true, subtree: true });
  }

  ready(() => {
    waitForApp((app) => {
      createEditControls();
      ensureGameNightTab();
      applyTextEdits();
      installListeners();
      observeApp(app);
    });
  });
})();
