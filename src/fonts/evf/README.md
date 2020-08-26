# Events Force Icons

### How to update the `.ttf` file with a new icon

1. Acquire a `.svg` file for your icon
2. Place it into `src/fonts/evf/svg` with a unique name
3. On a mac, install the application `FontForge`
5. Open FontForge
5. `file/open`, select `evf.sfd`
6. Select a glyph cell. 
7. Take note of the unicode identifier (e.g. `U+0025`). This will identify your icon
8. `file/import`, select the `.svg` you added in step 2, and select the format `SVG` in the dropdown.
9. Click the `import` button.
10. `file/save`.
11. `file/Generate Fonts`
12. Name the output `evf.ttf`
13. Ensure `TrueType` is the icon type
14. Hit generate.
15. Ignore the warnings that popup
16. Copy the output file, `evf.ttf`, into `src/fonts/evf` (overwriting the existing one)
17. Open `evf.js`
18. Add your icon name (matching the file name from step 2) and unicode id (which you noted in step 6) to the `glyphMap` object. Use a format like `\u0021` for the code

### How to use your icon in the tap
```javascript
import { EVFIcons } from <path_to_src/fonts>
import { Icon } from 'SVComponents'

...

<Icon
  Element={EVFIcons}
  name={'<icon_name>'}
/>
```


