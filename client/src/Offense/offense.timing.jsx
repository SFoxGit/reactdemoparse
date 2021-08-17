// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import React from 'react'
import { ResponsiveBar } from 'nivo'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsiveBar(props) {
  const summaryStats = props.summaryStats
  const data = async () => {
    const arr = [];
    await summaryStats.forEach(element => {
      if (element.atksBeforePS > 0) {
        arr.push({
          "player": element.player,
          'Early': element.offTiming.early,
          'EarlyColor': "hsl(334, 70%, 50%)",
          '<0.33': element.offTiming.one,
          '<0.33Color': "hsl(323, 70%, 50%)",
          '<0.67': element.offTiming.two,
          '<0.67Color': "hsl(224, 70%, 50%)",
          '<1.0': element.offTiming.three,
          '<1.0Color': "hsl(148, 70%, 50%)",
          '<1.5': element.offTiming.four,
          '<1.5Color': "hsl(321, 70%, 50%)",
          '<2.0': element.offTiming.five,
          '<2.0Color': "hsl(5, 70%, 50%)",
          '>2.0': element.offTiming.six,
          '>2.0Color': "hsl(180, 70%, 50%)",
        })
      }
    })
    console.log("array: " + arr)
    return arr
  }
  return (
    <ResponsiveBar
      data={data}
      keys={['Early', '<0.33', '<0.67', '<1.0', '<1.5', '<2.0', '>2.0']}
      indexBy="player"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat={{ format: '', enabled: false }}
      colors={{ scheme: 'red_yellow_blue' }}
      // defs={[
      //   {
      //     id: 'dots',
      //     type: 'patternDots',
      //     background: 'inherit',
      //     color: '#38bcb2',
      //     size: 4,
      //     padding: 1,
      //     stagger: true
      //   },
      //   {
      //     id: 'lines',
      //     type: 'patternLines',
      //     background: 'inherit',
      //     color: '#eed312',
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10
      //   }
      // ]}
      // fill={[
      //   {
      //     match: {
      //       id: '<1.5'
      //     },
      //     id: 'dots'
      //   },
      //   {
      //     match: {
      //       id: '<0.67'
      //     },
      //     id: 'lines'
      //   }
      // ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'player',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'spikes',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}

export default MyResponsiveBar;