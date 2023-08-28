SRC_FILE='styles.scss'
SRC_DIR='./scss'

OUT_FILE='styles.css'
OUT_DIR='./output/css/'

sass -I $SRC_DIR --watch --verbose --style compressed \
    $SRC_DIR/$SRC_FILE $OUT_DIR/$OUT_FILE