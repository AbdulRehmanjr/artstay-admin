type AccountTypeEnum = "NONE" |
  "ARTISAN" |
  "SAFARI" |
  "FAIRS" |
  "BUSINESS" |
  "HOTEL" |
  "RESTAURANT" |
  "TRAVEL_PLANER" |
  "SUPERADMIN" |
  "ARTISAN_ADMIN" |
  "SAFARI_ADMIN" |
  "FAIRS_ADMIN" |
  "BUSINESS_ADMIN" |
  "HOTEL_ADMIN" |
  "RESTAURANT_ADMIN" |
  "TRAVEL_PLANER_ADMIN"

type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};


type LoginProps = {
  token: string,
  user: {
    id: string,
    email: string,
    accountType: string
  }
};

type CraftProps = {
  craftId: string;
  craftName: string;
  craftSlug: string;
  createdAt: Date;
  updateAt: Date;
}

type SubCraftProps = {
  subCraftId: string;
  subCraftName: string;
  subCraftSlug: string;
  craftId: string;
  createdAt: Date;
  updatedAt: Date;
}


type ArtisanDetailProps = {
  artisanId: string
  firstName: string
  lastName: string
  address: string
  description: string
  experience: string
  education: string
  training: string
  certificate: string
  recongnition: string
  craftId: string
  subCraftId: string
  dp: string
  isActive: boolean;
  craftId: string;
  subCraftId: string;
  accountId: string;
  subCraft: SubCraftProps
  craft: CraftProps
}

type SafariProps = {
  safariId: string
  firstName: string
  lastName: string
  dp: string
  address: string
  isActive: boolean
  description: string
  accountId: string
}
