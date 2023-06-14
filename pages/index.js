import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";
import Layout from "@/components/Layout";
import React from "react";

export default function index() {
  return (
    <Layout>
      <HomeHeader />
      <HomeStats />
    </Layout>
  );
}
