import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function MovingTruck() {
const truckRef = useRef()
  const { scene } = useGLTF('/truck.glb')
useFrame((state) => {
  if (!truckRef.current) return
  const { viewport } = state

  // Calculate exactly how far we've scrolled
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  // Ensure we don't divide by zero if the page is short
  const scrollProgress = maxScroll <= 0 ? 0 : scrollY / maxScroll

  // Push the truck higher so it starts off-screen
  const top = viewport.height / 2 + 1.2 
  const bottom = -viewport.height / 2 - 1.2

  // The truck now maps its Y position to the FULL length of the page
  const targetY = top - scrollProgress * (top - bottom)

  // Smooth movement
  truckRef.current.position.y += (targetY - truckRef.current.position.y) * 0.05

  // Keep it on the right edge
  const edgeOffset = 0.3
  truckRef.current.position.x = viewport.width / 2 - edgeOffset
})
  return (
<primitive
  ref={truckRef}
  object={scene}
  scale={0.2}
rotation={[-Math.PI / 2, Math.PI, -Math.PI / 2]}


/>
  )
}