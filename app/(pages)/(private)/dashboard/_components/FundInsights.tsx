"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart1 } from "./Chart1";
import { Chart2 } from "./Chart2";

const FundInsights = () => {
  return (
    <div className="col-span-4 space-y-2">
      <Chart1 />
      <Chart2 />
    </div>
  );
};

export default FundInsights;
