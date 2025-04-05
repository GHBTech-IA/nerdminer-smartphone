let hashes = 0;
let startTime = Date.now();

function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return crypto.subtle.digest("SHA-256", data).then(buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

async function miner() {
  const nonce = Math.floor(Math.random() * 1e12).toString();
  const hash = await sha256(nonce);
  hashes++;

  document.getElementById("hashes").textContent = hashes;
  document.getElementById("lastHash").textContent = hash;

  const elapsed = (Date.now() - startTime) / 1000;
  const hps = (hashes / elapsed).toFixed(2);
  document.getElementById("hashrate").textContent = hps;
  document.getElementById("uptime").textContent = `${Math.floor(elapsed)}s`;

  setTimeout(miner, 0); // loop sem delay visível
}

miner();
