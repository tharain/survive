import { Typography, Tag } from "antd";
import * as React from "react";
import {
  atomOneDark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import BasicCard from "src/components/BasicCard";
import ExplainOptionals from "src/pages/Notes/components/ExplainOptionals";
import { Theme } from "src/redux/reducers/globalConfigs";

interface Props {
  theme?: Theme;
}
const THEME = {
  light: docco,
  dark: atomOneDark,
};
const { Text, Paragraph, Title } = Typography;

const Chapter1: React.FC<Props> = ({ theme = "light" }: Props) => (
  <BasicCard theme={theme}>
    <Title level={3}>1 Vehicle Orientation</Title>
    <Title level={4}>1.1 Checking the car <Tag>Car Mechanic</Tag></Title>
    <Text>✓ walk around the exterior of the car, is there any blockage or damage that may not allow you to drive safely?</Text>
    <br/>
    <Text>✓ Start the engine. Manual car might have keyless car. Press once to start the accessories. Press twice to supply electricity to the whole car. Press 3rd time to shut down.</Text>
    <br/>
    <Text>✓ Go inside the car and step on the brakes, did the brake lights work? (Tip: just press on the brakes)</Text>
    <br/>
    <Text>✓ Also check the left and right lights</Text>
    <br/>
    <Text>✓ Open the driver seat, and press the car button to open the bonnet. The fuel button is used to open the fuel tank.</Text>
    <br/>
    <Text>✓ Look underneath the bonnet, you will see a switch, click the switch and pull the bonnet up.</Text>
    <br/>
    <Text>✓ Be-careful the metal to hold the bonnet is very hot on the running engine. ONLY touch the rubber part and insert into the hole that fits the shape.</Text>
    <br/>
    <Text>✓ When you want to close the bonnet, put back the metal piece again with the rubber part and then lift it to your waist level and let it free-fall.</Text>
    <br/>
    <Text>✓ When placing the warning sign, put is 20m behind the car and 60m behind on a highway.</Text>
    <br/>
    <Text>✓ When changing car tyre, check that your new tyre is in a good condition and put underneath the car first before raising the car up.</Text>
    <Title level={4}>1.2 Posture in the car <Tag>Noob Driver</Tag></Title>
    <Text>8 clicks in the car</Text>
    <br/>
    <Text>head should never rest on head rest.</Text>
    <br/>
    <Text>can pull the driving wheel to make sure it should not touch the leg.</Text>
    <br/>
    <Text>when changing driver seat should always walk against the driving direction to see danger</Text>
    <Title level={4}>1.3 Basic Driving <Tag>Dangerous Driver</Tag></Title>
    <Text>Lock the car and wheel up the window.</Text>
    <br/>
    <Text>Check that the the handle is in neutral position.</Text>
    <br/>
    <Text>Step on Clutch completely (1/2/3/4/5), and press on the engine.</Text>
    <br/>
    <Text>Step on the brakes fully and remove the brakes.</Text>
    <br/>
    <Text>Remove the brakes and step on the accelerator at about 2 RPM, and shift to 1st gear.</Text>
    <br/>
    <Text>Make the clutch to bite-point and the car will start moving.</Text>
    <br/>
    <Text>make sure the line is the centre of the screen</Text>
    <br/>
    <Text>When turning set the turning light and make sure the line is in the triangle.</Text>
    <br/>
    <Text>How to stop the car: when gear is 1: step on clutch to point 4 then step on brakes gently.</Text>
    <br/>
    <Text>How to stop the car: when gear is 2 and above: step on brakes a bit then step on clutch to point 4</Text>
    <br/>
    <Text>When changing from gear 1 to anything, do not step on the accelerator otherwise the car will increase its RAM very high.</Text>
    <br/>
    <Text>If the engine is about the stall, step on the accelerator, the reason is because there is no fuel.</Text>
  </BasicCard>
);

export default Chapter1;
