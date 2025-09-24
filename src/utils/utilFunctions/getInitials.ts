export const getInitials = (fullName: string): string => {
  if (!fullName || fullName.trim() === '') {
    return '??';
  }

  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);

  if (nameParts.length === 0) {
    return '??';
  }

  if (nameParts.length === 1) {
    // Single name: take first two characters
    const firstName = nameParts[0];
    if (!firstName) {
      return '??';
    }
    return firstName.slice(0, 2).toUpperCase();
  }

  // Multiple names: take first character of first and last name
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  if (!firstName || !lastName) {
    return '??';
  }

  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);
  return (firstInitial + lastInitial).toUpperCase();
};
