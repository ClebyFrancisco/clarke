import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Home from "./pages/home/home.tsx";
import "./global.css";

const client = new ApolloClient({
  uri: import.meta.env.VITE_APP_HOST_API_kEY,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </React.StrictMode>
);
