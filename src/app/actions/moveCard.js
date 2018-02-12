export default function (itemId, left, top) {
  return {
    type: 'MOVE_CARD',
    id: itemId,
    left,
    top,
  };
}
