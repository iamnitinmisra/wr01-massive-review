SELECT g.name, c.make, c.model, c.year, g.vehicle, c.id
FROM garage g
JOIN cars c ON g.vehicle = c.id
WHERE make = $1
