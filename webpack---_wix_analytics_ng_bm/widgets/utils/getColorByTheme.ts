export function getColorByTheme(theme: string, isDashboardNext?: boolean): string {
  switch (theme) {
    case 'people':
      return isDashboardNext ? '#FBAD4E' : '#FC8E53';
    case 'sales':
      return '#46C6C3';
    default:
      return isDashboardNext ? '#418AFF' : '#3899EC';
  }
}
