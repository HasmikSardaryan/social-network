type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
export default function ProfileImage({ src = '', ...props }: ImageProps) {
  return (
    <img
      src={
        src
          ? import.meta.env.VITE_BASE_URL + src
          : import.meta.env.VITE_DEF_IMAGE
        }
        alt="Image"
        {...props}
    />
  );
}
