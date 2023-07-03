export function get404(req, res) {
  res.status(404).json({ error: 'Page Not Found' })
}
