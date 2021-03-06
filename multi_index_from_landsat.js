/*

This file contains a function, which can create multi-index bands based on a Landsat image and eventually concatenate them together.

The function name is "adding_indices" and it takes an image (i.e., "img") from an image collection.

This function can be used to create an image collection too.

It is written in JavaScript and spans from line 14 to 41.

*/


//bands
var adding_indices = function(img){   
        
      var NDVI_image = img.normalizedDifference(['B5', 'B4']).rename('NDVI');
        
      var EVI_image = img.expression(
        '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
        'NIR': img.select('B5').multiply(0.0001),
        'RED': img.select('B4').multiply(0.0001),
        'BLUE': img.select('B2').multiply(0.0001)})
        .rename('EVI');
        
      var SAVI_image = img.expression(
        '1.5 * ((NIR - RED) / (NIR + RED + 0.5))', {
        'NIR': img.select('B5').multiply(0.0001),
        'RED': img.select('B4').multiply(0.0001)})
        .rename('SAVI');
        
      var NDWI_image = img.normalizedDifference(['B3', 'B5']).rename('NDWI');
      
      var NDMI_image = img.normalizedDifference(['B5', 'B6']).rename('NDMI');
      
      var added_bands = img.addBands([NDVI_image,EVI_image,SAVI_image,NDWI_image,NDMI_image]);
      
      var req_bands = added_bands.select(['B2','B3','B4','B5','NDVI','EVI','SAVI','NDWI','NDMI']);
      
      return req_bands;
};


