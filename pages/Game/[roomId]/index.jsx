import React from 'react';
import { useRouter } from 'next/router';

function index() {
  const router = useRouter();
  const { roomId } = router.query;
  return <div>Room ID: {roomId}</div>;
}

export default index;
