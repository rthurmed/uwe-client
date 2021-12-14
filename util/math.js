
export const rad2deg = radians => radians * 180 / Math.PI

export const distance = (a, b) => Math.sqrt(
  (a.x - b.x) ** 2 +
  (a.y - b.y) ** 2
)
