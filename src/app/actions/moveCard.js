export default function (itemId, position) {
  console.log(`redux moveCard action called for item ${itemId} to ${JSON.stringify(position)}`);
  return {
    type: 'MOVE_CARD',
    id: itemId,
    position,
  };
}
