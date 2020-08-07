# Events Force Icons

### How to update the `.ttf` file with a new icon

1. Acquire a `.svg` file for your icon
2. On a mac, install the application `FontForge`
3. Open FontForge
4. `file/open`, select `evf.sfd`
5. Select a glyph cell. 
6. Take note of the unicode identifier (e.g. `U+0025`). This will identify your icon
7. Save.
8. `file/Generate Fonts`
9. Name the output `evf.ttf`
10. Ensure `TrueType` is the icon type
11. Hit generate.
12. Ignore the warnings that popup
13. Copy the output, `evf.ttf` into `src/fonts/evf`
14. Open `evf.js`
15. Add your icon name and unicode id (which you noted in step 6). Use a format like '\u0021' for code

### How to use your icon in the tap
```javascript
import { EVFIcons } from <path_to_src/fonts>`
import { Icon } from 'SVComponents'

...

<Icon
  Element={EVFIcons}
  name={'<icon_name>'}
/>
```


