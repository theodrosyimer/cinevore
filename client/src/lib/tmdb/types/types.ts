/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import type {
  ArrayValues,
  KeysOf,
  // ValuesOf,
  DeepWriteable,
} from './utility-types'

// import { movieCertifications } from '@/api-data/movie-certifications'
// import { configurationDetails } from '@/api-data/configuration-details'

export const configurationDetails = {
  images: {
    base_url: 'http://image.tmdb.org/t/p/',
    secure_base_url: 'https://image.tmdb.org/t/p/',
    backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
    logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile_sizes: ['w45', 'w185', 'h632', 'original'],
    still_sizes: ['w92', 'w185', 'w300', 'original'],
  },
  change_keys: [
    'adult',
    'air_date',
    'also_known_as',
    'alternative_titles',
    'biography',
    'birthday',
    'budget',
    'cast',
    'certifications',
    'character_names',
    'created_by',
    'crew',
    'deathday',
    'episode',
    'episode_number',
    'episode_run_time',
    'freebase_id',
    'freebase_mid',
    'general',
    'genres',
    'guest_stars',
    'homepage',
    'images',
    'imdb_id',
    'languages',
    'name',
    'network',
    'origin_country',
    'original_name',
    'original_title',
    'overview',
    'parts',
    'place_of_birth',
    'plot_keywords',
    'production_code',
    'production_companies',
    'production_countries',
    'releases',
    'revenue',
    'runtime',
    'season',
    'season_number',
    'season_regular',
    'spoken_languages',
    'status',
    'tagline',
    'title',
    'translations',
    'tvdb_id',
    'tvrage_id',
    'type',
    'video',
    'videos',
  ],
} as const

export const movieCertifications = {
  certifications: {
    AU: [
      {
        certification: 'E',
        meaning:
          'Exempt from classification. Films that are exempt from classification must not contain contentious material (i.e. material that would ordinarily be rated M or higher).',
        order: 1,
      },
      {
        certification: 'G',
        meaning: 'General. The content is very mild in impact.',
        order: 2,
      },
      {
        certification: 'PG',
        meaning:
          'Parental guidance recommended. There are no age restrictions. The content is mild in impact.',
        order: 3,
      },
      {
        certification: 'M',
        meaning:
          'Recommended for mature audiences. There are no age restrictions. The content is moderate in impact.',
        order: 4,
      },
      {
        certification: 'MA 15+',
        meaning:
          'Mature Accompanied. Unsuitable for children younger than 15. Children younger than 15 years must be accompanied by a parent or guardian. The content is strong in impact.',
        order: 5,
      },
      {
        certification: 'R 18+',
        meaning:
          'Restricted to 18 years and over. Adults only. The content is high in impact.',
        order: 6,
      },
      {
        certification: 'X 18+',
        meaning:
          'Restricted to 18 years and over. Films with this rating have pornographic content. Films classified as X18+ are banned from being sold or rented in all Australian states and are only legally available in the Australian Capital Territory and the Northern Territory. However, importing X18+ material from the two territories to any of the Australian states is legal.The content is sexually explicit in impact.',
        order: 7,
      },
      {
        certification: 'RC',
        meaning:
          'Refused Classification. Banned from sale or hire in Australia; also generally applies to importation (if inspected by and suspicious to Customs). Private Internet viewing is unenforced and attempts to legally censor such online material has resulted in controversy. Films are rated RC if their content exceeds the guidelines. The content is very high in impact.',
        order: 8,
      },
    ],
    BG: [
      {
        certification: 'D',
        meaning: 'Prohibited for persons under 16.',
        order: 4,
      },
      {
        certification: 'X',
        meaning: 'Prohibited for persons under 18.',
        order: 5,
      },
      {
        certification: 'B',
        meaning: 'Without age restrictions.',
        order: 2,
      },
      {
        certification: 'C',
        meaning: 'Not recommended for children under 12.',
        order: 3,
      },
      {
        certification: 'A',
        meaning: 'Recommended for children.',
        order: 1,
      },
    ],
    BR: [
      {
        certification: '14',
        meaning:
          'Not recommended for minors under fourteen. More violent material, stronger sex references and/or nudity.',
        order: 4,
      },
      {
        certification: '16',
        meaning:
          'Not recommended for minors under sixteen. Scenes featuring production, trafficking and/or use of illegal drugs, hyper-realistic sex, sexual violence, abortion, torture, mutilation, suicide, trivialization of violence and death penalty.',
        order: 5,
      },
      {
        certification: 'L',
        meaning:
          'General Audiences. Do not expose children to potentially harmful content.',
        order: 1,
      },
      {
        certification: '12',
        meaning:
          'Not recommended for minors under twelve. Scenes can include physical aggression, use of legal drugs and sexual innuendo.',
        order: 3,
      },
      {
        certification: '10',
        meaning:
          'Not recommended for minors under ten. Violent content or inappropriate language to children, even if of a less intensity.',
        order: 2,
      },
      {
        certification: '18',
        meaning:
          'Not recommended for minors under eighteen. Scenes featuring explicit sex, incest, pedophilia, praising of the use of illegal drugs and violence of a strong imagery impact.',
        order: 6,
      },
    ],
    CA: [
      {
        certification: 'G',
        meaning: 'All ages.',
        order: 2,
      },
      {
        certification: 'PG',
        meaning:
          'Parental guidance advised. There is no age restriction but some material may not be suitable for all children.',
        order: 3,
      },
      {
        certification: '14A',
        meaning:
          'Persons under 14 years of age must be accompanied by an adult.',
        order: 4,
      },
      {
        certification: '18A',
        meaning:
          'Persons under 18 years of age must be accompanied by an adult. In the Maritimes & Manitoba, children under the age of 14 are prohibited from viewing the film.',
        order: 5,
      },
      {
        certification: 'R',
        meaning:
          'Restricted to 18 years and over. No rental or purchase by those under 18. Content not suitable for minors. Video contains frequent use of: sexual activity; brutal/graphic violence; intense horror; and/or other disturbing content.',
        order: 6,
      },
      {
        certification: 'A',
        meaning:
          'Admittance restricted to people 18 years of age or older. Sole purpose of the film is the portrayal of sexually explicit activity and/or explicit violence.',
        order: 7,
      },
      {
        certification: 'E',
        meaning:
          'Exempt. Contains material not subject to classification such as documentaries, nature, travel, music, arts and culture, sports and educational and instructional information.',
        order: 1,
      },
    ],
    'CA-QC': [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'G',
        meaning:
          'General Rating – May be viewed, rented or purchased by persons of all ages. If a film carrying a "G" rating might offend the sensibilities of a child under 8 years of age, "Not suitable for young children" is appended to the classification.',
        order: 1,
      },
      {
        certification: '13+',
        meaning:
          '13 years and over – May be viewed, rented or purchased only by children 13 years of age or over. Children under 13 may be admitted only if accompanied by an adult.',
        order: 2,
      },
      {
        certification: '16+',
        meaning:
          '16 years and over – May be viewed, rented or purchased only by children 16 years of age or over.',
        order: 3,
      },
      {
        certification: '18+',
        meaning:
          '18 years and over – May be viewed, rented or purchased only by adults 18 years of age or over. If a film contains real and explicit sexual activity "Explicit sexuality" is appended to the classification, and in the retail video industry storeowners are required to place the film in a room reserved for adults.',
        order: 4,
      },
    ],
    DE: [
      {
        certification: '12',
        meaning:
          'Children 12 or older admitted, children between 6 and 11 only when accompanied by parent or a legal guardian.',
        order: 3,
      },
      {
        certification: '18',
        meaning: 'No youth admitted, only adults.',
        order: 5,
      },
      {
        certification: '0',
        meaning: 'No age restriction.',
        order: 1,
      },
      {
        certification: '6',
        meaning: 'No children younger than 6 years admitted.',
        order: 2,
      },
      {
        certification: '16',
        meaning:
          'Children 16 or older admitted, nobody under this age admitted.',
        order: 4,
      },
    ],
    DK: [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'A',
        meaning: 'Suitable for a general audience.',
        order: 1,
      },
      {
        certification: '7',
        meaning: 'Not recommended for children under 7.',
        order: 2,
      },
      {
        certification: '11',
        meaning: 'For ages 11 and up.',
        order: 3,
      },
      {
        certification: '15',
        meaning: 'For ages 15 and up.',
        order: 4,
      },
      {
        certification: 'F',
        meaning: 'Exempt from classification.',
        order: 5,
      },
    ],
    ES: [
      {
        certification: 'A',
        meaning: 'General admission.',
        order: 1,
      },
      {
        certification: 'Ai',
        meaning: 'General admission.',
        order: 2,
      },
      {
        certification: '7',
        meaning: 'Not recommended for audiences under 7.',
        order: 3,
      },
      {
        certification: '7i',
        meaning: 'Not recommended for audiences under 7.',
        order: 4,
      },
      {
        certification: '12',
        meaning: 'Not recommended for audiences under 12.',
        order: 5,
      },
      {
        certification: '16',
        meaning: 'Not recommended for audiences under 16.',
        order: 5,
      },
      {
        certification: '18',
        meaning: 'Not recommended for audiences under 18.',
        order: 7,
      },
      {
        certification: 'X',
        meaning: 'Prohibited for audiences under 18.',
        order: 8,
      },
    ],
    FI: [
      {
        certification: 'K-16',
        meaning: 'Over 16 years.',
        order: 4,
      },
      {
        certification: 'K-12',
        meaning: 'Over 12 years.',
        order: 3,
      },
      {
        certification: 'K-7',
        meaning: 'Over 7 years.',
        order: 2,
      },
      {
        certification: 'S',
        meaning: 'For all ages.',
        order: 1,
      },
      {
        certification: 'K-18',
        meaning: 'Adults only.',
        order: 5,
      },
      {
        certification: 'KK',
        meaning: 'Banned from commercial distribution.',
        order: 6,
      },
    ],
    FR: [
      {
        certification: 'TP',
        meaning: 'Valid for all audiences.',
        order: 1,
      },
      {
        certification: '12',
        meaning:
          'Unsuitable for children younger than 12 or forbidden in cinemas for under 12.',
        order: 2,
      },
      {
        certification: '16',
        meaning:
          'Unsuitable for children younger than 16 or forbidden in cinemas for under 16.',
        order: 3,
      },
      {
        certification: '18',
        meaning:
          'Unsuitable for children younger than 18 or forbidden in cinemas for under 18.',
        order: 4,
      },
    ],
    GB: [
      {
        certification: '15',
        meaning:
          'Only those over 15 years are admitted. Nobody younger than 15 can rent or buy a 15-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category can contain adult themes, hard drugs, frequent strong language and limited use of very strong language, strong violence and strong sex references, and nudity without graphic detail. Sexual activity may be portrayed but without any strong detail. Sexual violence may be shown if discreet and justified by context.',
        order: 5,
      },
      {
        certification: 'R18',
        meaning:
          'Can only be shown at licensed adult cinemas or sold at licensed sex shops, and only to adults, those aged 18 or over. Films under this category are always hard-core pornography, defined as material intended for sexual stimulation and containing clear images of real sexual activity, strong fetish material, explicit animated images, or sight of certain acts such as triple simultaneous penetration and snowballing. There remains a range of material that is often cut from the R18 rating: strong images of injury in BDSM or spanking works, urolagnia, scenes suggesting incest even if staged, references to underage sex or childhood sexual development and aggressive behaviour such as hair-pulling or spitting on a performer are not permitted. More cuts are demanded in this category than any other category.',
        order: 7,
      },
      {
        certification: 'PG',
        meaning:
          'All ages admitted, but certain scenes may be unsuitable for young children. May contain mild language and sex/drugs references. May contain moderate violence if justified by context (e.g. fantasy).',
        order: 2,
      },
      {
        certification: '12A',
        meaning:
          'Films under this category are considered to be unsuitable for very young people. Those aged under 12 years are only admitted if accompanied by an adult, aged at least 18 years, at all times during the motion picture. However, it is generally not recommended that children under 12 years should watch the film. Films under this category can contain mature themes, discrimination, soft drugs, moderate swear words, infrequent strong language and moderate violence, sex references and nudity. Sexual activity may be briefly and discreetly portrayed. Sexual violence may be implied or briefly indicated.',
        order: 3,
      },
      {
        certification: 'U',
        meaning: 'All ages admitted, there is nothing unsuitable for children.',
        order: 1,
      },
      {
        certification: '18',
        meaning:
          'Only adults are admitted. Nobody younger than 18 can rent or buy an 18-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category do not have limitation on the bad language that is used. Hard drugs are generally allowed, and explicit sex references along with detailed sexual activity are also allowed. Scenes of strong real sex may be permitted if justified by the context. Very strong, gory, and/or sadistic violence is usually permitted. Strong sexual violence is permitted unless it is eroticised or excessively graphic.',
        order: 6,
      },
      {
        certification: '12',
        meaning:
          'Home media only since 2002. 12A-rated films are usually given a 12 certificate for the VHS/DVD version unless extra material has been added that requires a higher rating. Nobody younger than 12 can rent or buy a 12-rated VHS, DVD, Blu-ray Disc, UMD or game. The content guidelines are identical to those used for the 12A certificate.',
        order: 4,
      },
    ],
    HU: [
      {
        certification: '6',
        meaning: 'Not recommended below age of 6.',
        order: 2,
      },
      {
        certification: '16',
        meaning: 'Not recommended below age of 16.',
        order: 4,
      },
      {
        certification: 'KN',
        meaning: 'Without age restriction.',
        order: 1,
      },
      {
        certification: '18',
        meaning: 'Not recommended below age of 18.',
        order: 5,
      },
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: '12',
        meaning: 'Not recommended below age of 12.',
        order: 3,
      },
      {
        certification: 'X',
        meaning: 'Restricted below 18, for adults only.',
        order: 6,
      },
    ],
    IN: [
      {
        certification: 'U',
        meaning:
          'Unrestricted Public Exhibition throughout India, suitable for all age groups. Films under this category should not upset children over 4. Such films may contain educational, social or family-oriented themes. Films under this category may also contain fantasy violence and/or mild bad language.',
        order: 1,
      },
      {
        certification: 'U/A 7+',
        meaning: 'Viewable for 7 and above years old.',
        order: 2,
      },
      {
        certification: 'UA',
        meaning:
          'All ages admitted, but it is advised that children below 12 be accompanied by a parent as the theme or content may be considered intense or inappropriate for young children. Films under this category may contain mature themes, sexual references, mild sex scenes, violence with brief gory images and/or infrequent use of crude language.',
        order: 3,
      },
      {
        certification: 'U/A 13+',
        meaning: 'Viewable for 13 and above years old.',
        order: 4,
      },
      {
        certification: 'U/A 16+',
        meaning: 'Viewable for 16 and above years old.',
        order: 5,
      },
      {
        certification: 'A',
        meaning:
          'Restricted to adult audiences (18 years or over). Nobody below the age of 18 may buy/rent an A-rated DVD, VHS, UMD or watch a film in the cinema with this rating. Films under this category may contain adult/disturbing themes, frequent crude language, brutal violence with blood and gore, strong sex scenes and/or scenes of drug abuse which is considered unsuitable for minors.',
        order: 6,
      },
      {
        certification: 'S',
        meaning: 'Restricted to any special class of persons.',
        order: 7,
      },
    ],
    IT: [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'T',
        meaning: 'All ages admitted.',
        order: 1,
      },
      {
        certification: '6+',
        meaning: 'Not suitable for children under 6.',
        order: 2,
      },
      {
        certification: '14+',
        meaning:
          'Released to ages 14 and older; children who are at least 12 may be admitted with adult accompaniment.',
        order: 3,
      },
      {
        certification: '18+',
        meaning:
          'Released to ages 18 and older; children who are at least 16 may be admitted with adult accompaniment.',
        order: 4,
      },
    ],
    LT: [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'V',
        meaning: 'Movies for the audience of all ages.',
        order: 1,
      },
      {
        certification: 'N-7',
        meaning:
          'Movies for viewers from 7 years old. Younger than 7 years of age, viewers of this index have been featured only together with accompanying adult persons.',
        order: 2,
      },
      {
        certification: 'N-13',
        meaning:
          'Movies for viewers from 13 years of age. The viewers from 7 to 13 years of age are allowed to enter this index only together with accompanying adult persons.',
        order: 3,
      },
      {
        certification: 'N-16',
        meaning: 'Movies for viewers from 16 years of age.',
        order: 4,
      },
      {
        certification: 'N-18',
        meaning: 'Movies for viewers from 18 years of age.',
        order: 5,
      },
    ],
    MY: [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'U',
        meaning:
          '(Umum: "General Audiences") - For general audiences. (Used by the majority of films screened in Malaysia until 2008 but it continues only for television, notably for RTM.)',
        order: 1,
      },
      {
        certification: 'P13',
        meaning:
          '(Penjaga 13 : "Parental Guidance 13") - Children under 13 not admitted unless accompanied by an adult. (Introduced in 2006, this became the official Malaysian motion picture rating system in 2008. The "PG-13" rating was revised to "P13" from April 2012 onwards to emphasize the use of Malay language instead of English.) Passionate kissing scenes are not allowed under a P13 rating.',
        order: 2,
      },
      {
        certification: '18SG',
        meaning:
          '(Seram, Ganas: "Graphic Violence and Horror/Terror") - Film may contain strong violence, gore or horror/terror people may find objectionable.',
        order: 3,
      },
      {
        certification: '18SX',
        meaning:
          '(Seks: "Sexual Content") - Film may contain sex scenes, nudity or sexual dialogue/references people may find objectionable (despite scenes of sex and nudity being strictly censored off by the LPF.)',
        order: 4,
      },
      {
        certification: '18PA',
        meaning:
          '(Politik, Agama: "Strong Religious or Political Elements") - Film may contain elements which include religious, social or political aspects people may find objectionable. Rarely used.',
        order: 5,
      },
      {
        certification: '18PL',
        meaning:
          '(Pelbagai: "Various") - Film may contain strong violence, gore, horror/terror, sex scenes, nudity, sexual dialogues/references, religious, social or political aspects people may find objectionable. The majority of the 18+ movies use this rating. For example, a film with sex scenes and strong violence will be classified as 18PL, despite scenes of sex and nudity being strictly censored off by the LPF.',
        order: 6,
      },
    ],
    NL: [
      {
        certification: 'AL',
        meaning: 'All ages.',
        order: 1,
      },
      {
        certification: '6',
        meaning: 'Potentially harmful to children under 6 years.',
        order: 2,
      },
      {
        certification: '9',
        meaning: 'Potentially harmful to children under 9 years.',
        order: 3,
      },
      {
        certification: '12',
        meaning:
          'Potentially harmful to children under 12 years; broadcasting is not allowed before 8:00 pm.',
        order: 4,
      },
      {
        certification: '16',
        meaning:
          'Potentially harmful to children under 16 years; broadcasting is not allowed before 10:00 pm.',
        order: 6,
      },
      {
        certification: '14',
        meaning:
          'Potentially harmful to children under 14 years; broadcasting is not allowed before 8:00 pm.',
        order: 5,
      },
      {
        certification: '18',
        meaning:
          'Potentially harmful to (and not allowed for) children under 18 years; broadcasting is not allowed before midnight.',
        order: 7,
      },
    ],
    NO: [
      {
        certification: '6',
        meaning:
          '6 years (no restriction for children accompanied by an adult).',
        order: 2,
      },
      {
        certification: '9',
        meaning: '9 years (children down to 6 years accompanied by an adult).',
        order: 3,
      },
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: '18',
        meaning: ' 18 years (absolute lower limit).',
        order: 6,
      },
      {
        certification: '15',
        meaning: '15 years (young down to 12 years accompanied by an adult).',
        order: 5,
      },
      {
        certification: '12',
        meaning: '12 years (children down to 9 years accompanied by an adult).',
        order: 4,
      },
      {
        certification: 'A',
        meaning: 'Suitable for all.',
        order: 1,
      },
    ],
    NZ: [
      {
        certification: 'G',
        meaning: 'Suitable for general audiences.',
        order: 1,
      },
      {
        certification: 'PG',
        meaning: 'Parental guidance recommended for younger viewers.',
        order: 2,
      },
      {
        certification: 'M',
        meaning:
          'Suitable for (but not restricted to) mature audiences 16 years and up.',
        order: 3,
      },
      {
        certification: 'R13',
        meaning: 'Restricted to persons 13 years of age and over.',
        order: 4,
      },
      {
        certification: 'R15',
        meaning: 'Restricted to persons 15 years of age and over.',
        order: 6,
      },
      {
        certification: 'R16',
        meaning: 'Restricted to persons 16 years of age and over.',
        order: 7,
      },
      {
        certification: 'R18',
        meaning: 'Restricted to persons 18 years of age and over.',
        order: 9,
      },
      {
        certification: 'R',
        meaning:
          'Restricted to a particular class of persons, or for particular purposes, or both.',
        order: 11,
      },
      {
        certification: 'RP13',
        meaning: '',
        order: 5,
      },
      {
        certification: 'RP16',
        meaning: '',
        order: 8,
      },
      {
        certification: 'RP18',
        meaning: '',
        order: 10,
      },
    ],
    PH: [
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'PG',
        meaning:
          'Viewers below 13 years old must be accompanied by a parent or supervising adult.',
        order: 2,
      },
      {
        certification: 'X',
        meaning: '“X-rated” films are not suitable for public exhibition.',
        order: 6,
      },
      {
        certification: 'R-18',
        meaning: 'Only viewers who are 18 years old and above can be admitted.',
        order: 5,
      },
      {
        certification: 'R-16',
        meaning: 'Only viewers who are 16 years old and above can be admitted.',
        order: 4,
      },
      {
        certification: 'G',
        meaning: 'Viewers of all ages are admitted.',
        order: 1,
      },
      {
        certification: 'R-13',
        meaning: 'Only viewers who are 13 years old and above can be admitted.',
        order: 3,
      },
    ],
    PT: [
      {
        certification: 'Públicos',
        meaning:
          'For all the public (especially designed for children under 3 years of age).',
        order: 1,
      },
      {
        certification: 'M/3',
        meaning: 'Passed for viewers aged 3 and older.',
        order: 2,
      },
      {
        certification: 'M/6',
        meaning: 'Passed for viewers aged 6 and older.',
        order: 3,
      },
      {
        certification: 'M/12',
        meaning: 'Passed for viewers aged 12 and older.',
        order: 4,
      },
      {
        certification: 'M/14',
        meaning: 'Passed for viewers aged 14 and older.',
        order: 5,
      },
      {
        certification: 'M/16',
        meaning: 'Passed for viewers aged 16 and older.',
        order: 6,
      },
      {
        certification: 'M/18',
        meaning: 'Passed for viewers aged 18 and older.',
        order: 7,
      },
      {
        certification: 'P',
        meaning:
          'Special rating supplementary to the M/18 age rating denoting pornography.',
        order: 8,
      },
    ],
    RU: [
      {
        certification: '6+',
        meaning: '(For children above 6) – Unsuitable for children under 6.',
        order: 2,
      },
      {
        certification: '0+',
        meaning: 'All ages are admitted.',
        order: 1,
      },
      {
        certification: '16+',
        meaning: '(For children above 16) – Unsuitable for children under 16.',
        order: 4,
      },
      {
        certification: '18+',
        meaning:
          '(Prohibited for children) – Prohibited for children under 18.',
        order: 5,
      },
      {
        certification: '12+',
        meaning: '(For children above 12) – Unsuitable for children under 12.',
        order: 3,
      },
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
    ],
    SE: [
      {
        certification: '11',
        meaning:
          'Children over the age of 7, who are accompanied by an adult, are admitted to films that have been passed for children from the age of 11.',
        order: 3,
      },
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: '15',
        meaning:
          'Children over the age of 7, who are accompanied by an adult, are admitted to films that have been passed for children from the age of 11. Updated on March 1, 2017.',
        order: 4,
      },
      {
        certification: 'Btl',
        meaning: 'All ages.',
        order: 1,
      },
      {
        certification: '7',
        meaning:
          'Children under the age of 7, who are accompanied by an adult (a person aged 18 or over), are admitted to films that have been passed for children from the age of 7.',
        order: 2,
      },
    ],
    US: [
      {
        certification: 'R',
        meaning:
          'Under 17 requires accompanying parent or adult guardian 21 or older. The parent/guardian is required to stay with the child under 17 through the entire movie, even if the parent gives the child/teenager permission to see the film alone. These films may contain strong profanity, graphic sexuality, nudity, strong violence, horror, gore, and strong drug use. A movie rated R for profanity often has more severe or frequent language than the PG-13 rating would permit. An R-rated movie may have more blood, gore, drug use, nudity, or graphic sexuality than a PG-13 movie would admit.',
        order: 4,
      },
      {
        certification: 'PG',
        meaning:
          'Some material may not be suitable for children under 10. These films may contain some mild language, crude/suggestive humor, scary moments and/or violence. No drug content is present. There are a few exceptions to this rule. A few racial insults may also be heard.',
        order: 2,
      },
      {
        certification: 'NC-17',
        meaning:
          'These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens. NC-17 does not necessarily mean obscene or pornographic in the oft-accepted or legal meaning of those words.',
        order: 5,
      },
      {
        certification: 'G',
        meaning:
          'All ages admitted. There is no content that would be objectionable to most parents. This is one of only two ratings dating back to 1968 that still exists today.',
        order: 1,
      },
      {
        certification: 'NR',
        meaning: 'No rating information.',
        order: 0,
      },
      {
        certification: 'PG-13',
        meaning:
          'Some material may be inappropriate for children under 13. Films given this rating may contain sexual content, brief or partial nudity, some strong language and innuendo, humor, mature themes, political themes, terror and/or intense action violence. However, bloodshed is rarely present. This is the minimum rating at which drug content is present.',
        order: 3,
      },
    ],
    KR: [
      {
        certification: 'All',
        meaning: 'Film suitable for all ages.',
        order: 0,
      },
      {
        certification: '12',
        meaning:
          'Film intended for audiences 12 and over. Underage audiences accompanied by a parent or guardian are allowed.',
        order: 1,
      },
      {
        certification: '15',
        meaning:
          'Film intended for audiences 15 and over. Underage audiences accompanied by a parent or guardian are allowed.',
        order: 2,
      },
      {
        certification: '18',
        meaning: 'No one under 18 is allowed to watch this film.',
        order: 3,
      },
      {
        certification: 'Restricted Screening',
        meaning:
          'Film needs a certain restriction in screening or advertisement as it is considered a highly bad influence to universal human dignity, social value, good customs or national emotion due to excessive expression of nudity, violence, social behavior, etc. (technically not an age restriction but films with this rating may only be screened at "adults only" theatres, with the age of majority set at 19).',
        order: 4,
      },
    ],
    SK: [
      {
        certification: 'U',
        meaning: 'General audience.',
        order: 1,
      },
      {
        certification: '7',
        meaning: 'Not recommended for children younger than 7 years.',
        order: 2,
      },
      {
        certification: '12',
        meaning: 'Not recommended for people younger than 12 years.',
        order: 3,
      },
      {
        certification: '15',
        meaning: 'Not recommended for people younger than 15 years.',
        order: 4,
      },
      {
        certification: '18',
        meaning: 'Prohibited for minors under 18 years of age.',
        order: 5,
      },
    ],
    TH: [
      {
        certification: 'P',
        meaning: 'Educational.',
        order: 1,
      },
      {
        certification: 'G',
        meaning: 'General audience',
        order: 2,
      },
      {
        certification: '13',
        meaning: 'Suitable for viewers aged 13 years and over.',
        order: 3,
      },
      {
        certification: '15',
        meaning: 'Suitable for viewers aged 15 years and over',
        order: 4,
      },
      {
        certification: '18',
        meaning: 'Suitable for viewers aged 18 years and over.',
        order: 5,
      },
      {
        certification: '20',
        meaning: 'Content is unsuitable for viewers aged under 20',
        order: 6,
      },
      {
        certification: 'Banned',
        meaning: 'Films that are not allowed to screen publicly in Thailand',
        order: 7,
      },
    ],
    MX: [
      {
        certification: 'AA',
        meaning:
          'Informative-only rating: Understandable for children under 7 years.',
        order: 1,
      },
      {
        certification: 'A',
        meaning: 'Information-only rating: For all age groups.',
        order: 2,
      },
      {
        certification: 'B',
        meaning: 'Information-only rating: For adolescents 12 years and older.',
        order: 3,
      },
      {
        certification: 'B-15',
        meaning:
          'Information-only rating: Not recommended for children under 15.',
        order: 4,
      },
      {
        certification: 'C',
        meaning: 'Restrictive rating: For adults 18 and older.',
        order: 5,
      },
      {
        certification: 'D',
        meaning:
          'Restrictive rating: Adult movies (legally prohibited to those under 18 years of age).',
        order: 6,
      },
    ],
    ID: [
      {
        certification: 'SU',
        meaning: 'All ages.',
        order: 1,
      },
      {
        certification: '13+',
        meaning: 'Suitable for ages 13 and above.',
        order: 2,
      },
      {
        certification: '17+',
        meaning: 'Suitable for ages 17 and above.',
        order: 3,
      },
      {
        certification: '21+',
        meaning: 'Suitable for ages 21 and above.',
        order: 4,
      },
    ],
    TR: [
      {
        certification: 'Genel İzleyici Kitlesi',
        meaning: 'General audience.',
        order: 1,
      },
      {
        certification: '6A',
        meaning:
          'Viewers under the age of 6 may watch with accompanying family members.',
        order: 2,
      },
      {
        certification: '6+',
        meaning: 'Suitable for viewers aged 6 and over.',
        order: 3,
      },
      {
        certification: '10A',
        meaning:
          'Viewers under the age of 10 may watch with accompanying family members.',
        order: 4,
      },
      {
        certification: '10+',
        meaning: 'Suitable for viewers aged 10 and over.',
        order: 5,
      },
      {
        certification: '13A',
        meaning:
          'Viewers under the age of 13 may watch with accompanying family members.',
        order: 6,
      },
      {
        certification: '13+',
        meaning: 'Suitable for viewers aged 13 and over.',
        order: 7,
      },
      {
        certification: '16+',
        meaning: 'Suitable for viewers aged 16 and over.',
        order: 8,
      },
      {
        certification: '18+',
        meaning: 'Suitable for viewers aged 18 and over.',
        order: 9,
      },
    ],
    AR: [
      {
        certification: 'ATP',
        meaning: 'For all public.',
        order: 1,
      },
      {
        certification: '+13',
        meaning:
          'Suitable for 13-year-olds and over. Children under the age of 13 are admitted if accompanied by an adult.',
        order: 2,
      },
      {
        certification: '+16',
        meaning: 'Suitable for 16-year-olds and over.',
        order: 3,
      },
      {
        certification: '+18',
        meaning: 'Suitable for 18-year-olds and over.',
        order: 4,
      },
      {
        certification: 'C',
        meaning:
          'Suitable for 18-year-olds and over. Restricted to specially licensed venues.',
        order: 5,
      },
    ],
    GR: [
      {
        certification: 'K',
        meaning: 'No restrictions.',
        order: 1,
      },
      {
        certification: 'K12',
        meaning:
          'The film may contain mild violence and adult themes. Suitable for people aged 13 and above.',
        order: 2,
      },
      {
        certification: 'K15',
        meaning:
          'The film may contain violence, drug abuse, and softcore pornographic scenes. An ID card certifying the age is required in all Greek cinemas and video rental shops in order to get a cinema ticket or rent a video of a ',
        order: 3,
      },
      {
        certification: 'K18',
        meaning: 'Not permitted to people under the age of 18.',
        order: 4,
      },
    ],
    TW: [
      {
        certification: '0+',
        meaning: 'Viewing is permitted for audiences of all ages.',
        order: 1,
      },
      {
        certification: '6+',
        meaning:
          'Viewing is not permitted for children under 6; children between 6 and 11 shall be accompanied and given guidance by parents, teachers, seniors, or adult relatives or friends.',
        order: 2,
      },
      {
        certification: '12+',
        meaning: 'Viewing is not permitted for children under 12.',
        order: 3,
      },
      {
        certification: '15+',
        meaning: 'Viewing is not permitted for those under 15.',
        order: 4,
      },
      {
        certification: '18+',
        meaning: 'Viewing is not permitted for those under 18.',
        order: 5,
      },
    ],
    ZA: [
      {
        certification: 'A',
        meaning: 'Suitable for all.',
        order: 1,
      },
      {
        certification: 'PG',
        meaning: 'Parental Guidance.',
        order: 2,
      },
      {
        certification: '7-9PG',
        meaning:
          'Not suitable for children under the age of 7. Children aged 7–9 years old may not be admitted unless accompanied by an adult.',
        order: 3,
      },
      {
        certification: '10-12PG',
        meaning:
          'Not suitable for children under the age of 10. Children aged 10–12 years old may not be admitted unless accompanied by an adult.',
        order: 4,
      },
      {
        certification: '13',
        meaning: 'Not suitable for children under the age of 13.',
        order: 5,
      },
      {
        certification: '16',
        meaning: 'Not suitable for persons under the age of 16.',
        order: 6,
      },
      {
        certification: '18',
        meaning: 'Not suitable for persons under the age of 18.',
        order: 7,
      },
      {
        certification: 'X18',
        meaning:
          'No one under 18 admitted; restricted to licensed adult premises.',
        order: 8,
      },
      {
        certification: 'XX',
        meaning: 'Must not be distributed or exhibited in public.',
        order: 9,
      },
    ],
    SG: [
      {
        certification: 'G',
        meaning: 'Suitable for all ages.',
        order: 1,
      },
      {
        certification: 'PG',
        meaning: 'Suitable for all but parents should guide their young.',
        order: 2,
      },
      {
        certification: 'PG13',
        meaning:
          'Suitable for persons aged 13 and above but parental guidance is advised for children below 13.',
        order: 3,
      },
      {
        certification: 'NC16',
        meaning: 'Suitable for persons aged 16 and above.',
        order: 4,
      },
      {
        certification: 'M18',
        meaning: 'Suitable for persons aged 18 and above.',
        order: 5,
      },
      {
        certification: 'R21',
        meaning:
          'Suitable for adults aged 21 and above (restricted to licensed cinemas).',
        order: 6,
      },
    ],
    IE: [
      {
        certification: 'G',
        meaning:
          'Suitable for children of school going age (note: children can be enrolled in school from the age of 4).',
        order: 1,
      },
      {
        certification: 'PG',
        meaning:
          'Suitable for children over the age of 8. Parental guidance is recommended for children under the age of 12.',
        order: 2,
      },
      {
        certification: '12A',
        meaning:
          'Suitable for viewers of 12 and over. Younger children may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.',
        order: 3,
      },
      {
        certification: '15A',
        meaning:
          'Suitable for viewers of 15 and over. Younger viewers may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.',
        order: 4,
      },
      {
        certification: '16',
        meaning:
          'Suitable for viewers of 16 and over. Younger viewers are not admitted.',
        order: 5,
      },
      {
        certification: '18',
        meaning:
          'Suitable only for adults. Viewers under 18 are not admitted at cinemas or permitted to purchase/rent the video.',
        order: 6,
      },
      {
        certification: '12',
        meaning:
          'Suitable for viewers of 12 and over. Younger children may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.',
        order: 3,
      },
      {
        certification: '15',
        meaning:
          'Suitable for viewers of 15 and over. Younger viewers may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.',
        order: 4,
      },
    ],
    PR: [
      {
        certification: 'G',
        meaning: '',
        order: 1,
      },
      {
        certification: 'PG',
        meaning: '',
        order: 2,
      },
      {
        certification: 'PG-13',
        meaning: '',
        order: 3,
      },
      {
        certification: 'R',
        meaning: '',
        order: 4,
      },
      {
        certification: 'NC-17',
        meaning: '',
        order: 5,
      },
      {
        certification: 'NR',
        meaning: '',
        order: 0,
      },
    ],
    JP: [
      {
        certification: 'G',
        meaning: 'General, suitable for all ages.',
        order: 1,
      },
      {
        certification: 'PG12',
        meaning: 'Parental guidance requested for young people under 12 years.',
        order: 2,
      },
      {
        certification: 'R15+',
        meaning: 'No one under 15 admitted.',
        order: 3,
      },
      {
        certification: 'R18+',
        meaning: 'No one under 18 admitted.',
        order: 4,
      },
    ],
    VI: [
      {
        certification: 'G',
        meaning: 'All ages admitted.',
        order: 1,
      },
      {
        certification: 'PG',
        meaning: 'Some material may not be suitable for children.',
        order: 2,
      },
      {
        certification: 'PG-13',
        meaning: 'Some material may be inappropriate for children under 13.',
        order: 3,
      },
      {
        certification: 'R',
        meaning: 'Under 17 requires accompanying parent or adult guardian.',
        order: 4,
      },
      {
        certification: 'NC-17',
        meaning: 'No one 17 and under admitted.',
        order: 5,
      },
      {
        certification: 'NR',
        meaning: '',
        order: 0,
      },
    ],
    CH: [
      {
        certification: '0',
        meaning: '',
        order: 1,
      },
      {
        certification: '6',
        meaning: '',
        order: 2,
      },
      {
        certification: '8',
        meaning: '',
        order: 3,
      },
      {
        certification: '10',
        meaning: '',
        order: 4,
      },
      {
        certification: '12',
        meaning: '',
        order: 5,
      },
      {
        certification: '14',
        meaning: '',
        order: 6,
      },
      {
        certification: '16',
        meaning: '',
        order: 7,
      },
      {
        certification: '18',
        meaning: '',
        order: 8,
      },
    ],
    IL: [
      {
        certification: 'All',
        meaning: '',
        order: 1,
      },
      {
        certification: '12',
        meaning: '',
        order: 2,
      },
      {
        certification: '14',
        meaning: '',
        order: 3,
      },
      {
        certification: '16',
        meaning: '',
        order: 4,
      },
      {
        certification: '18',
        meaning: '',
        order: 5,
      },
    ],
    HK: [
      {
        certification: 'I',
        meaning: '',
        order: 1,
      },
      {
        certification: 'IIA',
        meaning: '',
        order: 2,
      },
      {
        certification: 'IIB',
        meaning: '',
        order: 3,
      },
      {
        certification: 'III',
        meaning: '',
        order: 4,
      },
    ],
    MO: [
      {
        certification: 'A',
        meaning: '',
        order: 1,
      },
      {
        certification: 'B',
        meaning: '',
        order: 2,
      },
      {
        certification: 'C',
        meaning: '',
        order: 3,
      },
      {
        certification: 'D',
        meaning: '',
        order: 4,
      },
    ],
    LV: [
      {
        certification: 'U',
        meaning: '',
        order: 1,
      },
      {
        certification: '7+',
        meaning: '',
        order: 2,
      },
      {
        certification: '12+',
        meaning: '',
        order: 3,
      },
      {
        certification: '16+',
        meaning: '',
        order: 4,
      },
      {
        certification: '18+',
        meaning: '',
        order: 5,
      },
    ],
    LU: [
      {
        certification: 'EA',
        meaning: '',
        order: 1,
      },
      {
        certification: '6',
        meaning: '',
        order: 2,
      },
      {
        certification: '12',
        meaning: '',
        order: 3,
      },
      {
        certification: '16',
        meaning: '',
        order: 4,
      },
      {
        certification: '18',
        meaning: '',
        order: 5,
      },
    ],
  },
} as const

export type TMDBMovieResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

/* ************************************************
                 CONFIGURATION
************************************************ */
export type TMDBConfiguration = typeof configurationDetails

export type TMDBImageConfiguration = TMDBConfiguration['images']
export type TMDBImageConfigurationWriteable =
  DeepWriteable<TMDBImageConfiguration>
export type TMDBChangeKeysConfiguration = TMDBConfiguration['change_keys']

export type TMDBImageSizesCategory = ArrayValues<
  Omit<TMDBImageConfigurationWriteable, 'base_url' | 'secure_base_url'>
>

// export type TMDBImageSizesCategoryKey = KeysOf<TMDBImageSizesCategory>

// export type TMDBImageSizesCategoryValues = ValuesOf<TMDBImageSizesCategory>

// function name<TKey extends TMDBImageSizesCategoryKey, TValue extends TMDBImageSizesCategory[TKey]>(sizeCategory: TKey, value: TValue) {
//   return ({
//     [sizeCategory]: value,

//   } as { [key in TKey]: TValue })
// }

// let t = name('profile_sizes', 'w45')
/* ************************************************
                   MOVIES
************************************************ */

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = {
  adult: boolean
  belongs_to_collection: null | {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  imdb_id: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
}

export type MovieCredits = {
  id: number
  cast: {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
  }[]
  crew: {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
  }[]
}
export type MovieCertifications = typeof movieCertifications.certifications

export type CountryListForMovieCertification = KeysOf<MovieCertifications>

export type MovieCertification<T extends CountryListForMovieCertification> =
  MovieCertifications[T]

/* ************************************************
                  COMPANIES
************************************************ */

export type ProductionCompany = {
  description: string
  headquarters: string
  homepage: string
  id: number
  logo_path: string
  name: string
  origin_country: string
  parent_company: null
}

export type ProductionCompanyLogo = {
  id: number
  logos: Logo[]
}

export type Logo = {
  aspect_ratio: number
  file_path: string
  height: number
  id: string
  file_type: string
  vote_average: number
  vote_count: number
  width: number
}
