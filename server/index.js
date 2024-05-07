const express = require("express");
const app = express();

const cors = require("cors");
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/events", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });

  const logText =
    "A computer program in its human-readable form is called source code. Source code needs another computer program to execute because computers can only execute their native machine instructions. Therefore, source code may be translated to machine instructions using a compiler written for the language. (Assembly language programs are translated using an assembler.) The resulting file is called an executable. Alternatively, source code may execute within an interpreter written for the language.[2] If the executable is requested for execution, then the operating system loads it into memory and starts a process.[3] The central processing unit will soon switch to this process so it can fetch, decode, and then execute each machine instruction.";

  const words = logText.split(" ");
  let index = 0;

  const sendWords = () => {
    if (index < words.length) {
      res.write(`data: ${words[index]}\n\n`);
      index += 1;
    } else {
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(sendWords, 500);
  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
