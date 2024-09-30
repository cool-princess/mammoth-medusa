import type { WidgetConfig } from "@medusajs/admin"
import { Container, Select, Text } from "@medusajs/ui";
import Chart from "../../components/shared/icons/chart";

const durations = [
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "7",
    label: "Last 7 days",
  },
]

const OrdersSummaryWidget = () => {
  return (
    <Container>
      <div className="flex gap-6 uppercase text-slate-500">
        <div className="border-ui-border-base w-full border-dotted border-r pr-6 m-auto">
          <Select>
            <Select.Trigger>
              <Select.Value placeholder="Last 30 days" />
            </Select.Trigger>
            <Select.Content>
              {durations.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.Content>
        </Select>
        </div>
        <div className="flex justify-between border-ui-border-base w-full border-dotted border-r pr-6">
          <div>
            <Text>Orders Made</Text>
            <Text className="text-black">282</Text>
          </div>
          <Chart />
        </div>
        <div className="border-ui-border-base w-full border-dotted border-r pr-6">
          <Text>Total Revenue</Text>
          <Text className="text-black">$159582.92</Text>
        </div>
        <div className="border-ui-border-base w-full border-dotted border-r pr-6">
          <Text>Avg Order Value</Text>
          <Text className="text-black">$55.91</Text>
        </div>
      </div>
    </Container>
  )
}

export const config: WidgetConfig = {
  zone: "order.list.before",
}

export default OrdersSummaryWidget