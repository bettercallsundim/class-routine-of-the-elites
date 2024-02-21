"use client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function ReduxProvider({ children }) {
  let client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_BACKEND}/graphql`,
    cache: new InMemoryCache(),
  });

  return <Provider store={store}>{children}</Provider>;
}
