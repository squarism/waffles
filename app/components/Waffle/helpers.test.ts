import { voteTotals, userVotes } from "./helpers"

const waffles = [
  {
    id: "choc",
    name: "Chocolate",
    image: "bleh",
    createdAt: new Date(),
    updatedAt: new Date(),
    votes: [
      { userId: "bob", value: 1 },
      { userId: "jane", value: 1 },
    ],
  },
  {
    id: "monte",
    name: "Monte Cristo",
    image: "bleh",
    createdAt: new Date(),
    updatedAt: new Date(),
    votes: [{ userId: "jane", value: 1 }],
  },
  {
    id: "straw",
    name: "Strawberry",
    image: "bleh",
    createdAt: new Date(),
    updatedAt: new Date(),
    votes: [{ userId: "bob", value: -1 }],
  },
]

test("totals up vote values", () => {
  const expected = [
    { id: "choc", votes: 2 },
    { id: "monte", votes: 1 },
    { id: "straw", votes: -1 },
  ]

  expect(voteTotals(waffles)).toEqual(expected)
})

test("creates a summary of true/false on has the current user voted already", () => {
  const user = "bob"

  const expected = [
    { id: "choc", vote: 1 },
    { id: "straw", vote: -1 },
  ]
  expect(userVotes(user, waffles)).toEqual(expected)
})
