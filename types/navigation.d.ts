// navigation/types.ts

export type TripsStackParamList = {
  TripsIndex: undefined;
  TripDetails: { id: string };
  TripEdit: { id: string };
};

export type TabsParamList = {
  Home: undefined;
  Explore: undefined;
  Trips: {
    screen?: keyof TripsStackParamList;
    params?: TripsStackParamList[keyof TripsStackParamList];
  };
  Profile: undefined;
};

export type ProtectedParamList = {
  Tabs: TabsParamList;
  CreateTrip: undefined;
};

export type RootParamList = {
  SignIn: undefined;
  SignUp: undefined;
  VerifyOtp: undefined;
  Onboarding: undefined;
};
