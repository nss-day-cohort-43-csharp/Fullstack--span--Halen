﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid_Fullstack.Data;
using Tabloid_Fullstack.Models;

namespace Tabloid_Fullstack.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;
        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        //Get all the tags and order alphabetically
        public List<Tag> Get()
        {
            return _context.Tag.OrderBy(t => t.Name).ToList();
        }
        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
        public Tag GetTagById(int id)
        {
            return _context.Tag.FirstOrDefault(t => t.Id == id);
        }
        public void Delete(int id)
        {
            var tag = GetTagById(id);
            _context.Tag.Remove(tag);
            _context.SaveChanges();
        }

    }
}
