import Image from 'next/image'

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Image
        src="/images/background2.jpg"
        alt="Diverse team collaborating in office"
        fill
        priority
        className="object-cover brightness-75"
      />
    </div>
  )
}
