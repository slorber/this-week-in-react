export function shortenTitle(title: string): string {
  return title
    .replace("This Week In React #", "📨 #")
    .replace("React Hebdo #", "📨 #");
}
