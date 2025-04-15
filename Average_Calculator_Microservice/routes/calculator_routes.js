const router = express.Router();

const WINDOW_SIZE = 10;
let numbers = [];

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isFibonacci = (num) => {
  let a = 0,
    b = 1,
    c = 1;
  while (c < num) {
    c = a + b;
    a = b;
    b = c;
  }
  return c === num || num === 0;
};

const isEven = (num) => {
  return num % 2 === 0;
};

const isRandom = (num) => {
  return Math.random() < 0.5;
};

// first api is prime number
router.get("/prime", (req, res) => {
  const num = parseInt(req.query.num);
  if (isNaN(num)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const result = isPrime(num);
  res.json({ number: num, isPrime: result });
});

// second api is fibonacci number
router.get("/fibonacci", (req, res) => {
  const num = parseInt(req.query.num);
  if (isNaN(num)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const result = isFibonacci(num);
  res.json({ number: num, isFibonacci: result });
});

// third api is even number
router.get("/even", (req, res) => {
  const num = parseInt(req.query.num);
  if (isNaN(num)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const result = isEven(num);
  res.json({ number: num, isEven: result });
});
// fourth api is random number
router.get("/random", (req, res) => {
  const num = parseInt(req.query.num);
  if (isNaN(num)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const result = isRandom(num);
  res.json({ number: num, isRandom: result });
});

//numbers array to store the last 10 numbers
router.get("/numbers", (req, res) => {
    const numbers = JSON.parse(fs.readFileSync('numbers.json'));
    res.json(numbers);
})

module.exports = router;