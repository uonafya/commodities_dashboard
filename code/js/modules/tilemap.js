/*
  Highcharts JS v6.1.3 (2018-09-12)
 Tilemap module

 (c) 2010-2017 Highsoft AS

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:"function"===typeof define&&define.amd?define(function(){return e}):e(Highcharts)})(function(e){(function(d){var e=d.defined,v=d.each,y=d.noop;d.colorPointMixin={isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setVisible:function(d){var f=this,r=d?"show":"hide";v(["graphic","dataLabel"],function(a){if(f[a])f[a][r]()})},setState:function(r){d.Point.prototype.setState.call(this,r);this.graphic&&
this.graphic.attr({zIndex:"hover"===r?1:0})}};d.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:y,parallelArrays:["x","y","value"],colorKey:"value",translateColors:function(){var d=this,f=this.options.nullColor,e=this.colorAxis,a=this.colorKey;v(this.data,function(b){var c=b[a];if(c=b.options.color||(b.isNull?f:e&&void 0!==c?e.toColor(c,b):b.color||d.color))b.color=c})},colorAttribs:function(d){var f=
{};e(d.color)&&(f[this.colorProp||"fill"]=d.color);return f}}})(e);(function(d){var e=d.colorPointMixin,v=d.each,y=d.merge,r=d.noop,f=d.pick,x=d.Series,a=d.seriesType,b=d.seriesTypes;a("heatmap","scatter",{animation:!1,borderWidth:0,dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{hover:{halo:!1,brightness:.2}}},y(d.colorSeriesMixin,
{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var c;b.scatter.prototype.init.apply(this,arguments);c=this.options;c.pointRange=f(c.pointRange,c.colsize||1);this.yAxis.axisPointRange=c.rowsize||1},translate:function(){var b=this.options,a=this.xAxis,d=this.yAxis,e=b.pointPadding||0,k=function(b,a,c){return Math.min(Math.max(a,b),c)};this.generatePoints();v(this.points,function(c){var g=(b.colsize||1)/2,h=(b.rowsize||1)/2,l=k(Math.round(a.len-
a.translate(c.x-g,0,1,0,1)),-a.len,2*a.len),g=k(Math.round(a.len-a.translate(c.x+g,0,1,0,1)),-a.len,2*a.len),t=k(Math.round(d.translate(c.y-h,0,1,0,1)),-d.len,2*d.len),h=k(Math.round(d.translate(c.y+h,0,1,0,1)),-d.len,2*d.len),m=f(c.pointPadding,e);c.plotX=c.clientX=(l+g)/2;c.plotY=(t+h)/2;c.shapeType="rect";c.shapeArgs={x:Math.min(l,g)+m,y:Math.min(t,h)+m,width:Math.abs(g-l)-2*m,height:Math.abs(h-t)-2*m}});this.translateColors()},drawPoints:function(){b.column.prototype.drawPoints.call(this);v(this.points,
function(b){b.graphic.css(this.colorAttribs(b))},this)},animate:r,getBox:r,drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,alignDataLabel:b.column.prototype.alignDataLabel,getExtremes:function(){x.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;x.prototype.getExtremes.call(this)}}),d.extend({haloPath:function(b){if(!b)return[];var a=this.shapeArgs;return["M",a.x-b,a.y-b,"L",a.x-b,a.y+a.height+b,a.x+a.width+b,a.y+a.height+b,a.x+a.width+b,a.y-
b,"Z"]}},e))})(e);(function(d){var e=d.seriesType,v=d.each,y=d.reduce,r=d.pick,f=function(a,b,c){return Math.min(Math.max(b,a),c)},x=function(a,b,c){a=a.options;return{xPad:(a.colsize||1)/-b,yPad:(a.rowsize||1)/-c}};d.tileShapeTypes={hexagon:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,getSeriesPadding:function(a){return x(a,3,2)},haloPath:function(a){if(!a)return[];var b=this.tileEdges;return["M",b.x2-a,b.y1+a,"L",b.x3+a,b.y1+a,b.x4+1.5*a,b.y2,b.x3+a,b.y3-a,b.x2-a,b.y3-a,b.x1-1.5*
a,b.y2,"Z"]},translate:function(){var a=this.options,b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,e=(a.colsize||1)/3,w=(a.rowsize||1)/2,k;this.generatePoints();v(this.points,function(a){var g=f(Math.floor(b.len-b.translate(a.x-2*e,0,1,0,1)),-b.len,2*b.len),u=f(Math.floor(b.len-b.translate(a.x-e,0,1,0,1)),-b.len,2*b.len),l=f(Math.floor(b.len-b.translate(a.x+e,0,1,0,1)),-b.len,2*b.len),t=f(Math.floor(b.len-b.translate(a.x+2*e,0,1,0,1)),-b.len,2*b.len),m=f(Math.floor(c.translate(a.y-w,0,1,0,1)),-c.len,
2*c.len),n=f(Math.floor(c.translate(a.y,0,1,0,1)),-c.len,2*c.len),p=f(Math.floor(c.translate(a.y+w,0,1,0,1)),-c.len,2*c.len),q=r(a.pointPadding,d),h=q*Math.abs(u-g)/Math.abs(p-n),h=b.reversed?-h:h,z=b.reversed?-q:q,q=c.reversed?-q:q;a.x%2&&(k=k||Math.round(Math.abs(p-m)/2)*(c.reversed?-1:1),m+=k,n+=k,p+=k);a.plotX=a.clientX=(u+l)/2;a.plotY=n;g+=h+z;u+=z;l-=z;t-=h+z;m-=q;p+=q;a.tileEdges={x1:g,x2:u,x3:l,x4:t,y1:m,y2:n,y3:p};a.shapeType="path";a.shapeArgs={d:["M",u,m,"L",l,m,t,n,l,p,u,p,g,n,"Z"]}});
this.translateColors()}},diamond:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,getSeriesPadding:function(a){return x(a,2,2)},haloPath:function(a){if(!a)return[];var b=this.tileEdges;return["M",b.x2,b.y1+a,"L",b.x3+a,b.y2,b.x2,b.y3-a,b.x1-a,b.y2,"Z"]},translate:function(){var a=this.options,b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,e=a.colsize||1,w=(a.rowsize||1)/2,k;this.generatePoints();v(this.points,function(a){var h=f(Math.round(b.len-b.translate(a.x-e,0,1,0,0)),-b.len,2*b.len),
g=f(Math.round(b.len-b.translate(a.x,0,1,0,0)),-b.len,2*b.len),l=f(Math.round(b.len-b.translate(a.x+e,0,1,0,0)),-b.len,2*b.len),t=f(Math.round(c.translate(a.y-w,0,1,0,0)),-c.len,2*c.len),m=f(Math.round(c.translate(a.y,0,1,0,0)),-c.len,2*c.len),n=f(Math.round(c.translate(a.y+w,0,1,0,0)),-c.len,2*c.len),p=r(a.pointPadding,d),q=p*Math.abs(g-h)/Math.abs(n-m),q=b.reversed?-q:q,p=c.reversed?-p:p;a.x%2&&(k=Math.abs(n-t)/2*(c.reversed?-1:1),t+=k,m+=k,n+=k);a.plotX=a.clientX=g;a.plotY=m;h+=q;l-=q;t-=p;n+=
p;a.tileEdges={x1:h,x2:g,x3:l,y1:t,y2:m,y3:n};a.shapeType="path";a.shapeArgs={d:["M",g,t,"L",l,m,g,n,h,m,"Z"]}});this.translateColors()}},circle:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,getSeriesPadding:function(a){return x(a,2,2)},haloPath:function(a){return d.seriesTypes.scatter.prototype.pointClass.prototype.haloPath.call(this,a+(a&&this.radius))},translate:function(){var a=this.options,b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,e=(a.rowsize||1)/2,w=a.colsize||1,k,g,r,
u,l=!1;this.generatePoints();v(this.points,function(a){var h=f(Math.round(b.len-b.translate(a.x,0,1,0,0)),-b.len,2*b.len),n=f(Math.round(c.translate(a.y,0,1,0,0)),-c.len,2*c.len),p=d,q=!1;void 0!==a.pointPadding&&(p=a.pointPadding,l=q=!0);if(!u||l)k=Math.abs(f(Math.floor(b.len-b.translate(a.x+w,0,1,0,0)),-b.len,2*b.len)-h),g=Math.abs(f(Math.floor(c.translate(a.y+e,0,1,0,0)),-c.len,2*c.len)-n),r=Math.floor(Math.sqrt(k*k+g*g)/2),u=Math.min(k,r,g)-p,l&&!q&&(l=!1);a.x%2&&(n+=g*(c.reversed?-1:1));a.plotX=
a.clientX=h;a.plotY=n;a.radius=u;a.shapeType="circle";a.shapeArgs={x:h,y:n,r:u}});this.translateColors()}},square:{alignDataLabel:d.seriesTypes.heatmap.prototype.alignDataLabel,translate:d.seriesTypes.heatmap.prototype.translate,getSeriesPadding:function(){},haloPath:d.seriesTypes.heatmap.prototype.pointClass.prototype.haloPath}};d.wrap(d.Axis.prototype,"setAxisTranslation",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));var b=this,c=y(d.map(b.series,function(a){return a.getSeriesPixelPadding&&
a.getSeriesPixelPadding(b)}),function(a,b){return(a&&a.padding)>(b&&b.padding)?a:b},void 0)||{padding:0,axisLengthFactor:1},e=Math.round(c.padding*c.axisLengthFactor);c.padding&&(b.len-=e,a.apply(b,Array.prototype.slice.call(arguments,1)),b.minPixelPadding+=c.padding,b.len+=e)});e("tilemap","heatmap",{states:{hover:{halo:{enabled:!0,size:2,opacity:.5,attributes:{zIndex:3}}}},pointPadding:2,tileShape:"hexagon"},{setOptions:function(){var a=d.seriesTypes.heatmap.prototype.setOptions.apply(this,Array.prototype.slice.call(arguments));
this.tileShape=d.tileShapeTypes[a.tileShape];return a},alignDataLabel:function(){return this.tileShape.alignDataLabel.apply(this,Array.prototype.slice.call(arguments))},getSeriesPixelPadding:function(a){var b=a.isXAxis,c=this.tileShape.getSeriesPadding(this),d;if(!c)return{padding:0,axisLengthFactor:1};d=Math.round(a.translate(b?2*c.xPad:c.yPad,0,1,0,1));a=Math.round(a.translate(b?c.xPad:0,0,1,0,1));return{padding:Math.abs(d-a)||0,axisLengthFactor:b?2:1.1}},translate:function(){return this.tileShape.translate.apply(this,
Array.prototype.slice.call(arguments))}},d.extend({haloPath:function(){return this.series.tileShape.haloPath.apply(this,Array.prototype.slice.call(arguments))}},d.colorPointMixin))})(e)});
//# sourceMappingURL=tilemap.js.map
