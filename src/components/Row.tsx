import {Button, Text, View} from 'react-native';

interface RowProps {
  title: string;
  selectable?: boolean;
  selected?: boolean;
  onSelectedChange?: (value: boolean) => void;
  onPress?: () => void;
}
export function Row({
  title,
  onPress,
  selectable,
  selected,
  onSelectedChange,
}: RowProps) {
  return (
    <View
      style={{
        marginTop: 4,
        padding: 6,
        backgroundColor: '#bbb',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {selectable && (
        <Button
          title={selected ? '[x]' : '[ ]'}
          onPress={() => onSelectedChange && onSelectedChange(!selected)}
        />
      )}
      <Text>{title}</Text>
      <Button title="info" onPress={onPress} />
    </View>
  );
}
