const mode: "standby" | "auto" = "auto";
let turn = 0;

while (mode === "auto") {
  turn++;
  console.log(`[AGENT] Turn ${turn}`);
  await Bun.sleep(500);
}
