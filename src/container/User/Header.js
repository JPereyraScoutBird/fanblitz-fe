import { Image, useTheme, View } from "@aws-amplify/ui-react";
import Images from '../../img';

export function Header() {
  const { tokens } = useTheme();

  return (
    <View style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      // height: '100vh'
    }}>
    <Image
      alt="logo"
      src={Images.Logo}
      padding={tokens.space.medium}
    />
    </View>
  );
}
