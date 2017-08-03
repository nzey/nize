export default function (itemId, left, top) {
  console.log(`redux moveCard action called for item ${itemId} to [${left}, ${top}]`);
  return {
    type: 'MOVE_CARD',
    id: itemId,
    left,
    top,
  };
}
