


import os
import json


TOPICS_ROOT_PATH = '../../topics/'
JSON_ROOT_PATH = '../json/'
JSON_FILENAME = 'topics.json'

def remove_tags(string):

    clean_string = ''

    i = 0
    while i < len(string):
        
        st = string[i]
        if st == '<':
            i += 1
            st = string[i]
            while i < len(string) and st != '>':
                i += 1
                st = string[i]
            i += 1
        
        if i < len(string):
            st = string[i]
            if st == '<':
                continue
            clean_string += st

            i += 1

    return clean_string


def get_topic_title(html_lines):

    title_line = ''

    # Pega a linha q contêm o título
    for line in html_lines:
        if '<title>' in line:
            title_line = line.strip()
            break
    
    title = remove_tags(title_line).strip()

    return title

def get_topic_text(html_lines):

    text_lines = ''

    # Pega a linha q contêm o título
    for i, line in enumerate(html_lines):
        if 'topic-text__outer' in line:
            i += 1
            line = html_lines[i]
            text_lines += f' {line.strip()}'
            
            while '</body>' not in line:
                i += 1
                line = html_lines[i]
                text_lines += f' {line.strip()}'
    
    return remove_tags(text_lines).strip().lower()

def get_topic_time(html_lines):

    for line in html_lines:
        if 'id="clock"' in line:
            time_full_text = remove_tags(line)

    time_text = time_full_text.split(':')[-1].strip()
    time_int = int(time_text.split()[0])

    return {'time_int': time_int, 'time_text': time_text}

def get_topic_tags(html_lines):

    tags = []
    for line in html_lines:

        if 'class="tag' in line:
            tag = remove_tags(line).strip()
            if tag != '':
                tags.append(tag)

    return tags
    
def get_html_lines(filename):

    with open(f'{TOPICS_ROOT_PATH}{filename}', encoding="utf8") as topic:
        html_lines = topic.readlines()

    return html_lines

def get_filenames():

    return os.listdir(TOPICS_ROOT_PATH)


if __name__ == "__main__":

    filenames = get_filenames()
    json_data = {}
    for i, filename in enumerate(filenames):
        html_lines = get_html_lines(filename)

        title = get_topic_title(html_lines)
        tags  = get_topic_tags(html_lines)
        text  = title.lower() + ' ' + get_topic_text(html_lines)
        for tag in tags:
            text += f' {tag.lower()}'
        path = f'topics/{filename}'

        json_data[i] = {
            'title': title,
            'tags': tags,
            'text': text,
            'path': path,
            'read_time': get_topic_time(html_lines)
        }

        get_topic_time(html_lines)

    with open(JSON_ROOT_PATH+JSON_FILENAME, 'w') as json_file:
        json.dump(json_data, json_file)

    pass