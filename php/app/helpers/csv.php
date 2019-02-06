<?php

namespace app\helpers;

/**
 *  Application CSV files operations helper
 */
class csv
{
    /**
     *  Add data to the end of selected CSV file
     *
     *  @param string $file, Filename with folder relative to document root
     *  @param array $data
     */
    public function addData($file, $data)
    {
        $file = new \SplFileObject($_SERVER['DOCUMENT_ROOT'] . "/$file", 'a');
        $file->fputcsv($data);
    }
}
