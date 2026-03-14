import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function MovingTruck() {
  const truckRef = useRef()
  const { scene } = useGLTF('/truck.glb')
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => { scrollRef.current = window.scrollY }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (!truckRef.current) return
    const { viewport } = state

    const scrollY = scrollRef.current
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = maxScroll <= 0 ? 0 : scrollY / maxScroll

    const top = viewport.height / 2 + 1.2
    const bottom = -viewport.height / 2 - 1.2
    const targetY = top - scrollProgress * (top - bottom)
    truckRef.current.position.y += (targetY - truckRef.current.position.y) * 0.05

    const isMobile = window.innerWidth <= 767

    // On mobile: push truck to the very right edge (same as desktop scrollbar position)
    // Desktop uses edgeOffset 0.3, mobile needs less offset to sit right at edge
    const edgeOffset = isMobile ? 0.09 : 0.3
    truckRef.current.position.x = viewport.width / 2 - edgeOffset

    // Scale: smaller on mobile
    truckRef.current.scale.setScalar(isMobile ? 0.11 : 0.2)
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
