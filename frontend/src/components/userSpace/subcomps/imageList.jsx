
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { useFetchFromLocalimages } from "src/services/fetchFromServers";
import { saveAs } from 'file-saver'
//this function is used to set the image src and srcset
function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const ImageLists = () => {
  //fetch image urls from local images
  const { imageUrls } = useFetchFromLocalimages();
  //set imageUrls to itemData
  const itemData = imageUrls.map((item) => ({
    img: item.url,
    title: item.title,
  }));
    
  return (
    <ImageList
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      rowHeight={200}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`star ${item.title}`}
                  onClick={() => saveAs(item.img, item.title)}
                >
                  <DownloadIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default ImageLists;


