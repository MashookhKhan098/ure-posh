import Image from 'next/image'

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80"
        alt="Diverse team collaborating in office"
        fill
        priority
        className="object-cover brightness-75"
      />
    </div>
  )
}
