import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: { 
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: isDashboard ? 0 : 5,
        tickPadding: isDashboard ? 0 : 5,
        tickRotation: isDashboard ? 0 : -60,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: isDashboard ? 0 : 40,
        legendPosition: "middle",

      }}
      axisLeft={{
        orient: "left",
        tickValues: isDashboard ? 1 : 5,
        tickSize: 3,
        tickPadding: isDashboard ? 0 : 5,
        tickRotation: isDashboard ? 0 : -45,
        legend: isDashboard ? undefined : "count",
        legendOffset: isDashboard ? 0 : -40,
        legendPosition: "middle",
      }}
      
      
      enableGridX={false}
      enableGridY={false}
      pointSize={isDashboard ? 5 : 8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: isDashboard ? "top-right" : "bottom-right",
          direction: "column",
          justify: false,
          translateX: isDashboard ? 0 : 100,
          translateY: isDashboard ? 0 : 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: isDashboard ? 8 : 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      
    />
  );
};

export default LineChart;