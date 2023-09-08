export async function getAll(req, res, next) {
  try {
    res.send({ data: {} });
  } catch (error) {
    next(error);
  }
}
