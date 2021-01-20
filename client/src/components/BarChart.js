import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { colors } from "../styled/muiTheme";

const Chart = (props) => {
  const { data } = props;
  return (
    <BarChart
      width={600}
      height={220}
      data={data}
      margin={{
        top: 5,
        bottom: 5,
      }}
    >
      <Legend />
      <YAxis />
      <Tooltip />
      <XAxis dataKey="month" />
      <Bar
        dataKey="billedHours"
        fill={colors.primary.main}
        name="Verrechnete Stunden"
      />
      <Bar
        dataKey="totalHours"
        fill={colors.secondary.main}
        name="Alle Stunden"
      />
    </BarChart>
  );
};

export default Chart;
