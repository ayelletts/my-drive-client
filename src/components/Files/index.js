import File from "../File";

export default function Files(props) {
  const { files } = props;
  return (
    <>
      <ul>
        <li>
          {files.map((file) => {
            return <File key={file.name} {...file} />;
          })}
        </li>
      </ul>
    </>
  );
}
