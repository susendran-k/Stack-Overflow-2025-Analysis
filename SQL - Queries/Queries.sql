create view final_career_roadmap as
 select 
  p.responseid,
  p.mainpath,
  p.explevel,
  t.language,
  round(avg(p.convertedcompyearly)) as avg_salary
 from dev_profiles p
 join tech_stacks t on p.responseid = t.responseid
 group by p.responseid, p.mainpath, p.explevel, t.language

-- Languages have the biggest jump in pay when moving from Mid to Senior in the web dev path

select 
 language,
 explevel,
 avg_salary,
lag(avg_salary) over (partition by language order by avg_salary) as prev_level_salary,
avg_salary - lag(avg_salary) over (partition by language order by avg_salary) as salary_jump
from final_career_roadmap
where mainpath = 'web_enterprise' and explevel in ('mid_2-5', 'senior_5-10')
order by salary_jump desc nulls last

-- High pay tech stack

select 
 mainpath,
 explevel,
 round(avg(convertedcompyearly)) as avg_pay,
 count(*) as job_count
from dev_profiles
group by mainpath, explevel
order by explevel, avg_pay desc

-- Education level -> Career Growth

select 
 edlevel,
 explevel,
 round(avg(convertedcompyearly)) as avg_salary
from dev_profiles
where edlevel is not null
group by edlevel, explevel
order by avg_salary desc

-- Global demand

select
    country, 
    language, 
    count(*) as mentions,
    round(avg(p.convertedcompyearly)) as avg_salary
from dev_profiles p
join tech_stacks t on p.responseid = t.responseid
where p.country in (
    select country from dev_profiles 
    group by country order by count(*) desc limit 10
)
group by p.country, t.language
having count(*) > 100
order by  p.country, mentions desc