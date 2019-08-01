# gatsby-transformer-ms-word

Use [mammoth](https://github.com/mwilliamson/mammoth.js) to extract textual content of MS Word files.

## Install

`npm install --save gatsby-transformer-ms-word`

You also need to have gatsby-source-filesystem installed and configured so it points to your files.

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    `gatsby-transformer-ms-word`
  ]
};
```

Then you'll be able to query the textual content of your pdfs files like:

```javascript
{
  allDocx {
    edges {
      node {
        content
      }
    }
  }
}
```

Which would return:

```javascript
{
  "data": {
    "allDocx": {
      "edges": [
        {
          "node": {
            "content": "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel purus id tortor \r\neleifend vulputate. Integer interdum ultricies ligula, nec mattis lorem viverra ac. \r\n"
          }
        }
      ]
    }
  }
}
```
