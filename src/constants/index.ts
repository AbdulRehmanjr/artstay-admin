/**
 * RedirectMap for admin account types
 * Maps account types to their respective paths
 */
export const RedirectMap: Record<string, string> = {
  'ARTISAN_ADMIN': "/artisan",
  'SAFARI_ADMIN': "/safari",
  'FAIRS_ADMIN': "/fairs",
  'BUSINESS_ADMIN': "/business",
  'HOTEL_ADMIN': "/hotels",
  'RESTAURANT_ADMIN': "/restaurants",
  'TRAVEL_PLANER_ADMIN': "/travel",
  'SUPERADMIN': "/admin",
  'NONE': "/dashboard",
  // Add non-admin account types with default redirect
  'ARTISAN': "/dashboard",
  'SAFARI': "/dashboard",
  'FAIRS': "/dashboard",
  'BUSINESS': "/dashboard",
  'HOTEL': "/dashboard",
  'RESTAURANT': "/dashboard",
  'TRAVEL_PLANER': "/dashboard",
};

/**
 * Account type display names
 * Used for displaying friendly names in the UI
 */
export const AccountTypeDisplayNames: Record<string, string> = {
  'ARTISAN_ADMIN': "Artisan Admin",
  'SAFARI_ADMIN': "Safari Admin",
  'FAIRS_ADMIN': "Fairs Admin",
  'BUSINESS_ADMIN': "Business Admin",
  'HOTEL_ADMIN': "Hotel Admin",
  'RESTAURANT_ADMIN': "Restaurant Admin",
  'TRAVEL_PLANER_ADMIN': "Travel Planner Admin",
  'SUPERADMIN': "Super Admin",
  'NONE': "None",
  // Add non-admin account types
  'ARTISAN': "Artisan",
  'SAFARI': "Safari",
  'FAIRS': "Fairs",
  'BUSINESS': "Business",
  'HOTEL': "Hotel",
  'RESTAURANT': "Restaurant",
  'TRAVEL_PLANER': "Travel Planner",
}; 