import React from 'react';
import { SparklineComponent, Inject, SparklineTooltip } from '@syncfusion/ej2-react-charts';

class SparkLine extends React.PureComponent {
  render() {
    const { id, height, width, color, data, type, currentColor } = this.props;


    const monthName = [
        { id: 1, Name:"January"},
        { id: 2, Name:"February"},
        { id: 3, Name:"March"},
        { id: 4, Name:"April"},
        { id: 5, Name:"May"},
        { id: 6, Name:"June"},
        { id: 7, Name:"July"},
        { id: 8, Name:"August"},
        { id: 9, Name:"September"},
        { id: 10, Name:"October"},
        { id: 11, Name:"November"},
        { id: 12, Name:"December"},
    ]

    data.forEach((item)=>{
        monthName.map((name)=>{
            if (item.month == name.id) {
                item.monthName = name.Name
            }
        })
    })

    // soldItem.forEach((item)=>{
    //     categoryName.map((name) => {
    //         if (item.productCategory == name.id) {
    //             item.category = name.categoryName   
    //         }
    //     })


 

    console.log(data)
   
        return (
            <SparklineComponent
              id={id}
              height={height}
              width={width}
              lineWidth={1}
              valueType="Category"
              fill={color}
              border={{ color: currentColor, width: 2 }}
              tooltipSettings={{
                visible: true,
                format: '${monthName} : data ${total_revenue}',
                trackLineSettings: {
                  visible: true,
                },
              }}
              markerSettings={{ visible: ['All'], size: 2.5, fill: currentColor }}
              dataSource={data}
              xName="monthName"
              yName="total_revenue"
              type={type}
            >
              <Inject services={[SparklineTooltip]} />
            </SparklineComponent>
          );
        
  
    
  }
}

export default SparkLine;