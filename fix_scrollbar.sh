#!/bin/bash
sed -i '/<head>/a \    <style>\n      ::-webkit-scrollbar {\n        display: none;\n      }\n      * {\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n      }\n    </style>' index.html
