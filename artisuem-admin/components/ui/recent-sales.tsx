"use client"
import CanvasJSReact from '@canvasjs/react-charts';

const Sales = ({ data }: any) => {
  if(data===null) return <></>
  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  console.log(data);
  const config = {
    animationEnabled: true,
    title: {
      text: "Customer Satisfaction",
      fontFamily: "Inter, sans-serif",
      backgroundColor: "transparent",
    },
    subtitles: [{
      text: "",
      verticalAlign: "center",
      fontSize: 24,
      fontFamily: "Inter, sans-serif",
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      fontFamily: "Inter, sans-serif",
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: data
    }]
};
  return (
    <div className=" flex flex-col justify-start items-center gap-5 w-full h-full rounded-xl overflow-clip ">
     <CanvasJSChart options={config}/>
    </div>
  );
};

export default Sales;
